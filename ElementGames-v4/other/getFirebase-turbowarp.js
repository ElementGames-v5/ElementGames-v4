class egsdk {
    getInfo() {
        return {
            id: 'egsdk',
            name: 'EGSDK',
            blocks: [
                {
                    opcode: 'username',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Username'
                },
                {
                    opcode: 'submitScore',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Submit score: [SCORE] [USERNAME]',
                    arguments: {
                        SCORE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Score'
                        },
                        USERNAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Username'
                        }
                    }
                }
            ]
        };
    }

    username() {
        return new Promise((resolve, reject) => {
            window.parent.postMessage('GetUsername', '*');
            function receiveMessage(event) {
                if (typeof event.data === 'string') {
                    window.removeEventListener('message', receiveMessage);
                    resolve(event.data);
                }
            }
            window.addEventListener('message', receiveMessage);
        });
    }

    submitScore({SCORE, USERNAME}) {
        return new Promise((resolve, reject) => {
            console.log('Submitting score:', SCORE, 'for user:', USERNAME);
            window.parent.SubmitScore(SCORE, USERNAME);
            resolve();
        });
    }
}

Scratch.extensions.register(new egsdk());
