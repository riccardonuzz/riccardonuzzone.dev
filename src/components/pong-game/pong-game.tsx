'use client'

import { useRouter } from "next/navigation"
import { MouseEvent, useEffect, useRef, useState } from "react"

const PongGame = () => {
    const router = useRouter()
    let myImage: HTMLImageElement | null = null

    if (typeof window === 'object' || typeof document === 'object') {
        myImage = new Image(20, 20)
        myImage.src = "/pong/react.png"
    }


    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gameRunningRef = useRef<boolean>(false)
    const animationIdRef = useRef<number>(0)
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })

    const pressedKeysRef = useRef({ upPressed: false, downPressed: false, sPressed: false, wPressed: false })

    const ballInitialProperties = {
        ballRadius: 10,
        ballX: 0,
        ballY: 0,
        ballSpeedX: 10,
        ballSpeedY: 10
    }
    const ballPropertiesRef = useRef(ballInitialProperties)

    const paddleInitialProperties = {
        paddleHeight: 80,
        paddleWidth: 10,
        leftPaddleY: (canvasRef.current?.height || 0) / 2 - 10 / 2,
        rightPaddleY: (canvasRef.current?.height || 0) / 2 - 80 / 2,
        paddleSpeed: 10,
    }
    const paddlePropertiesRef = useRef(paddleInitialProperties)

    const playersScoreInitial = {
        leftPlayerScore: 0,
        rightPlayerScore: 0,
        maxScore: 10
    }
    const playersScoreRef = useRef(playersScoreInitial)



    const onStartClick = (event: MouseEvent) => {
        if (!gameRunningRef?.current) { // only start the game if gameRunning is false
            gameRunningRef.current = true // set gameRunning to true when the game starts
            loop()
        }
    }

    const onRestartClick = (event: MouseEvent) => {
        router.refresh()
    }

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            pressedKeysRef.current.upPressed = true
        } else if (event.key === "ArrowDown") {
            pressedKeysRef.current.downPressed = true
        } else if (event.key === "w") {
            pressedKeysRef.current.wPressed = true
        } else if (event.key === "s") {
            pressedKeysRef.current.sPressed = true
        }
    }

    const keyUpHandler = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            pressedKeysRef.current.upPressed = false
        } else if (event.key === "ArrowDown") {
            pressedKeysRef.current.downPressed = false
        } else if (event.key === "w") {
            pressedKeysRef.current.wPressed = false
        } else if (event.key === "s") {
            pressedKeysRef.current.sPressed = false
        }
    }

    const onPauseClick = (event: MouseEvent) => {
        gameRunningRef.current = false
        cancelAnimationFrame(animationIdRef?.current);
    }


    // Update game state
    const update = () => {
        if (canvasRef.current && paddlePropertiesRef.current && playersScoreRef.current) {
            const canvas = canvasRef.current
            const paddleProperties = paddlePropertiesRef.current
            const playersScore = playersScoreRef.current

            // Move paddles
            if (pressedKeysRef.current.upPressed && paddleProperties.rightPaddleY > 0) {
                paddlePropertiesRef.current.rightPaddleY = paddlePropertiesRef.current.rightPaddleY - paddlePropertiesRef.current.paddleSpeed
            } else if (pressedKeysRef.current.downPressed && paddleProperties.rightPaddleY + paddleProperties.paddleHeight < canvas.height) {
                paddlePropertiesRef.current.rightPaddleY = paddlePropertiesRef.current.rightPaddleY + paddlePropertiesRef.current.paddleSpeed
            }

            // Move right paddle based on "w" and "s" keys
            if (pressedKeysRef.current.wPressed && paddleProperties.leftPaddleY > 0) {
                paddlePropertiesRef.current.leftPaddleY = paddlePropertiesRef.current.leftPaddleY - paddlePropertiesRef.current.paddleSpeed
            } else if (pressedKeysRef.current.sPressed && paddleProperties.leftPaddleY + paddleProperties.paddleHeight < canvas.height) {
                paddlePropertiesRef.current.leftPaddleY = paddlePropertiesRef.current.leftPaddleY + paddlePropertiesRef.current.paddleSpeed
            }

            ballPropertiesRef.current.ballX = ballPropertiesRef.current.ballX + ballPropertiesRef.current.ballSpeedX
            ballPropertiesRef.current.ballY = ballPropertiesRef.current.ballY + ballPropertiesRef.current.ballSpeedY

            // Check if ball collides with top or bottom of canvas
            if (ballPropertiesRef.current?.ballY - ballPropertiesRef.current?.ballRadius < 0 || ballPropertiesRef.current?.ballY + ballPropertiesRef.current?.ballRadius > canvas.height) {
                ballPropertiesRef.current.ballSpeedY = -ballPropertiesRef.current.ballSpeedY
            }

            // Check if ball collides with left paddle
            if (
                ballPropertiesRef.current?.ballX - ballPropertiesRef.current?.ballRadius < paddleProperties.paddleWidth &&
                ballPropertiesRef.current?.ballY > paddleProperties.leftPaddleY &&
                ballPropertiesRef.current?.ballY < paddleProperties.leftPaddleY + paddleProperties.paddleHeight
            ) {
                ballPropertiesRef.current.ballSpeedX = -ballPropertiesRef.current.ballSpeedX
            }

            // Check if ball collides with right paddle
            if (
                ballPropertiesRef.current?.ballX + ballPropertiesRef.current?.ballRadius > canvas.width - paddleProperties.paddleWidth &&
                ballPropertiesRef.current?.ballY > paddleProperties.rightPaddleY &&
                ballPropertiesRef.current?.ballY < paddleProperties.rightPaddleY + paddleProperties.paddleHeight
            ) {
                ballPropertiesRef.current.ballSpeedX = -ballPropertiesRef.current.ballSpeedX
            }

            // Check if ball goes out of bounds on left or right side of canvas
            if (ballPropertiesRef.current?.ballX < 0) {
                playersScoreRef.current.rightPlayerScore = playersScore.rightPlayerScore + 1
                reset();
            } else if (ballPropertiesRef.current?.ballX > canvas.width) {
                playersScore.leftPlayerScore = playersScore.leftPlayerScore + 1
                reset();
            }

            // Check if a player has won
            if (playersScore.leftPlayerScore === playersScore.maxScore) {
                playerWin("Left player");
            } else if (playersScore.rightPlayerScore === playersScore.maxScore) {
                playerWin("Right player");
            }
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = () => {
        if (canvasRef.current && paddlePropertiesRef.current && playersScoreRef.current) {
            const ctx = canvasRef.current.getContext("2d")!;
            const canvas = canvasRef.current
            const paddleProperties = paddlePropertiesRef.current
            const playersScore = playersScoreRef.current

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#FFF";
            ctx.font = "15px Arial";

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.strokeStyle = "#FFF"; // Set line color to white
            ctx.stroke();
            ctx.closePath();



            // Draw ball
            // ctx.beginPath();
            if (myImage)
                ctx.drawImage(myImage, ballPropertiesRef.current?.ballX - 15, ballPropertiesRef.current?.ballY - 15, 30, 30);
            // ctx.arc(ballPropertiesRef.current?.ballX, ballPropertiesRef.current?.ballY, ballPropertiesRef.current?.ballRadius, 0, Math.PI * 2);
            // ctx.fill();
            // ctx.closePath();

            // Draw left paddle
            ctx.fillRect(0, paddleProperties.leftPaddleY, paddleProperties.paddleWidth, paddleProperties.paddleHeight);

            // Draw right paddle
            ctx.fillRect(canvas.width - paddleProperties.paddleWidth, paddleProperties.rightPaddleY, paddleProperties.paddleWidth, paddleProperties.paddleHeight);

            // Draw scores
            ctx.fillText("Score: " + playersScore.leftPlayerScore, 10, 20);
            ctx.fillText("Score: " + playersScore.rightPlayerScore, canvas.width - 70, 20);
        }
    }


    const reset = () => {
        if (canvasRef.current) {
            ballPropertiesRef.current = {
                ballRadius: 10,
                ballX: canvasRef.current.width / 2,
                ballY: canvasRef.current.height / 2,
                ballSpeedX: -ballPropertiesRef.current.ballSpeedX,
                ballSpeedY: Math.random() * 15 - 10
            }
        }
    }

    // Game loop
    const loop = () => {
        update();
        draw();
        animationIdRef.current = requestAnimationFrame(loop)
    }

    const playerWin = (message: string) => {
        reset()
    }


    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            const ballInitialProperties = {
                ballRadius: 10,
                ballX: canvasRef.current.width / 2,
                ballY: canvasRef.current.height / 2,
                ballSpeedX: 10,
                ballSpeedY: 10
            }
            ballPropertiesRef.current = ballInitialProperties

            const paddleInitialProperties = {
                paddleHeight: 80,
                paddleWidth: 10,
                leftPaddleY: canvasRef.current.height / 2 - 80 / 2,
                rightPaddleY: canvasRef.current.height / 2 - 80 / 2,
                paddleSpeed: 10,
            }
            paddlePropertiesRef.current = paddleInitialProperties

            draw()
        }

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyDownHandler);
        }

    }, [draw, canvasRef])

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current.getBoundingClientRect()
            setCanvasDimensions({ width: container.width, height: container.height })
        }
    }, [containerRef])



    return (
        <div ref={containerRef} className="w-full">
            <div className="w-full border">
                <canvas ref={canvasRef} id="canvas" width={canvasDimensions.width} height={canvasDimensions.height}></canvas>
            </div>

            <div className="mt-2">
                <button onClick={onStartClick} className="p-2 mr-2 border hover:bg-white hover:text-yellow-500">Start</button>
                <button onClick={onPauseClick} className="p-2 mr-2 border hover:bg-white hover:text-yellow-500">Pause</button>
                <button onClick={onRestartClick} className="p-2 border hover:bg-white hover:text-yellow-500">Restart</button>
            </div>
        </div>
    )
}

export { PongGame }