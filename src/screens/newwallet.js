import React from 'react';

const NewWallet = () => {
    return (
        <div>
            <h1>Create a New Wallet</h1>
            <form>
                <div>
                    <label htmlFor="walletName">Wallet Name:</label>
                    <input type="text" id="walletName" name="walletName" />
                </div>
                <div>
                    <label htmlFor="walletPassword">Password:</label>
                    <input type="password" id="walletPassword" name="walletPassword" />
                </div>
                <button type="submit">Create Wallet</button>
            </form>
        </div>
    );
};

export default NewWallet;