import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form action="/home">
                <p>
                    <label>Username or email address</label>
                    <br />
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link href="/forget-password">
                        <label className="right-label">Forget password?</label>
                    </Link>
                    <br />
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        Login
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    First time? <Link href="/register">Create an account</Link>.
                </p>
            </footer>
        </div>
    );
}
