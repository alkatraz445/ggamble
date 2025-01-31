<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let snake: { x: number; y: number }[] = [];
    let food: { x: number; y: number } = { x: 0, y: 0 };
    let direction = 'right';
    let gameLoop: number;
    let score = 0;
    let betAmount = 10;
    let isGameOver = false;
    let ws: WebSocket;

    const GRID_SIZE = 20;
    const CELL_SIZE = 20;

    function initGame() {
        snake = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 }
        ];
        generateFood();
        direction = 'right';
        score = 0;
        isGameOver = false;
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    }

    function draw() {
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = '#4CAF50';
        snake.forEach(segment => {
            ctx.fillRect(
                segment.x * CELL_SIZE,
                segment.y * CELL_SIZE,
                CELL_SIZE - 1,
                CELL_SIZE - 1
            );
        });

        // Draw food
        ctx.fillStyle = '#FF5252';
        ctx.fillRect(
            food.x * CELL_SIZE,
            food.y * CELL_SIZE,
            CELL_SIZE - 1,
            CELL_SIZE - 1
        );
    }

    function update() {
        if (isGameOver) return;

        const head = { ...snake[0] };

        switch (direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            gameOver();
            return;
        }

        // Check self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            generateFood();
            // Send score update to server
            ws?.send(JSON.stringify({
                type: 'game_action',
                action: 'score_update',
                score: score
            }));
        } else {
            snake.pop();
        }
    }

    function gameOver() {
        isGameOver = true;
        ws?.send(JSON.stringify({
            type: 'game_action',
            action: 'game_over',
            finalScore: score
        }));
    }

    function handleKeydown(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    }

    function startGame() {
        if (!ws) {
            ws = new WebSocket('ws://localhost:8000');
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: 'join_game',
                    game: 'snake',
                    bet: betAmount
                }));
            };
        }

        initGame();
        gameLoop = setInterval(() => {
            update();
            draw();
        }, 100);
    }

    onMount(() => {
        ctx = canvas.getContext('2d')!;
        canvas.width = GRID_SIZE * CELL_SIZE;
        canvas.height = GRID_SIZE * CELL_SIZE;
        window.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        clearInterval(gameLoop);
        window.removeEventListener('keydown', handleKeydown);
        ws?.close();
    });
</script>

<div class="container mx-auto p-4 flex flex-col items-center">
    <h1 class="h1 mb-4">Snake Game</h1>

    <div class="card p-4 w-full max-w-2xl variant-filled-surface">
        <div class="flex justify-between mb-4">
            <div class="text-lg">Score: {score}</div>
            <div class="text-lg">Bet Amount: {betAmount} tokens</div>
        </div>

        <canvas
            bind:this={canvas}
            class="border border-surface-500"
        ></canvas>

        {#if isGameOver}
            <div class="alert variant-filled-error mt-4">
                Game Over! Final Score: {score}
            </div>
        {/if}

        <div class="flex justify-center gap-4 mt-4">
            <button
                class="btn variant-filled-primary"
                on:click={startGame}
            >
                {isGameOver ? 'Play Again' : 'Start Game'}
            </button>
            <button
                class="btn variant-filled-surface"
                on:click={() => goto('/games')}
            >
                Back to Games
            </button>
        </div>
    </div>
</div>