<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let error = '';

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        error = '';

        try {
            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful login
                goto('/');
            } else {
                error = data.detail || 'Login failed. Please try again.';
            }
        } catch (e) {
            error = 'An error occurred. Please try again later.';
        }
    }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="card p-4 w-full max-w-md variant-filled-surface">
        <header class="card-header text-center">
            <h2 class="h2 mb-4">Login to GGamble</h2>
        </header>
        
        <form on:submit={handleSubmit} class="space-y-4">
            {#if error}
                <div class="alert variant-filled-error">{error}</div>
            {/if}
            
            <label class="label">
                <span>Email</span>
                <input
                    class="input"
                    type="email"
                    bind:value={email}
                    placeholder="Enter your email"
                    required
                />
            </label>

            <label class="label">
                <span>Password</span>
                <input
                    class="input"
                    type="password"
                    bind:value={password}
                    placeholder="Enter your password"
                    required
                />
            </label>

            <button type="submit" class="btn variant-filled-primary w-full">Login</button>

            <div class="text-center mt-4">
                <p>Don't have an account? <a href="/register" class="anchor">Register here</a></p>
            </div>
        </form>
    </div>
</div>