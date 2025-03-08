document.addEventListener("DOMContentLoaded", function () {
    // Get the username from the global variable
    const username = window.username || 'Guest';
    console.log("Loaded username:", username);

    if (username === 'Guest') {
        displayErrorMessage("Log in to see the daily puzzle.");
        return;
    }

    fetch("/api/daily-puzzle")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Puzzle Data Received:", data);

            if (!data || typeof data.position !== 'string' || !Array.isArray(data.solutions)) {
                throw new Error("Invalid puzzle data received from the server.");
            }

            // Extract solutions properly
            const puzzleSolutions = data.solutions.map(solution =>
                Array.isArray(solution) ? solution.map(move => move.trim()) : []
            );

            if (puzzleSolutions.length === 0) {
                throw new Error("No valid moves found in puzzle solutions.");
            }

            const boardElement = document.getElementById("board");
            if (!boardElement) {
                console.error("Chessboard container element (#board) not found.");
                return;
            }

            const game = new Chess();
            if (!game.load(data.position)) {
                throw new Error(`Invalid FEN string: ${data.position}`);
            }

            const board = Chessboard(boardElement, {
                position: data.position,
                draggable: true,
                onDrop: handleMove
            });

            console.log("Chessboard and game initialized.");

            // Initialize the current move index
            let currentMoveIndex = 0;

            function handleMove(source, target) {
                let moveObj = { from: source, to: target };

                // **Check for Pawn Promotion**
                if (
                    (game.turn() === 'w' && target[1] === '8') || 
                    (game.turn() === 'b' && target[1] === '1')
                ) {
                    let promotion = prompt("Promote to (Q, R, B, N)?", "Q").toUpperCase();
                    if (!['Q', 'R', 'B', 'N'].includes(promotion)) {
                        alert("Invalid choice, defaulting to Queen.");
                        promotion = 'Q';
                    }
                    moveObj.promotion = promotion.toLowerCase(); // chess.js requires lowercase letters
                }

                const attemptedMove = game.move(moveObj);

                if (!attemptedMove) {
                    console.error(`Invalid move made: ${source}-${target}`);
                    alert("Invalid move! Try again.");
                    return 'snapback';
                }

                // Handle move validation
                const moveSAN = attemptedMove.san;
                const expectedSolution = puzzleSolutions.find(solution => solution[currentMoveIndex] === moveSAN);

                if (expectedSolution) {
                    console.log("Correct move!");
                    board.position(game.fen()); // Update board
                    currentMoveIndex++;

                    // Handle automatic opponent move
                    if (currentMoveIndex < expectedSolution.length) {
                        setTimeout(() => {
                            const opponentMove = expectedSolution[currentMoveIndex];
                            game.move(opponentMove);
                            board.position(game.fen());
                            currentMoveIndex++;
                        }, 500); // Delay to simulate opponent move
                    }

                    // Check if the puzzle is solved
                    if (currentMoveIndex >= expectedSolution.length) {
                        setTimeout(() => alert('Puzzle solved!'), 500);
                    }
                } else {
                    console.error(`Incorrect move! Expected: ${expectedSolution[currentMoveIndex]}, Got: ${moveSAN}`);
                    alert("Incorrect move! Try again.");
                    game.undo();
                    board.position(game.fen());
                    return 'snapback';
                }
            }

            // **Fix for pawn promotion visual issue**
            function updateBoardAfterPromotion() {
                board.position(game.fen()); // Ensure board updates visually
            }

            setInterval(updateBoardAfterPromotion, 100); // Keep checking for updates
        })
        .catch(error => {
            console.error("Error loading the puzzle:", error);
            displayErrorMessage("Failed to load the puzzle. Please try again later.");
        });

    function displayErrorMessage(message) {
        const errorElement = document.getElementById("error-message");
        errorElement.innerText = message;
        errorElement.style.display = "block";
    }
});
