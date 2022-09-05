export const getSortedTransactions = (txList) => {
    if (txList.length <= 1) {
        return txList;
    }
    var inputTransactions = [];
    txList.forEach(function (tx) {
        return tx.inputs.forEach(function (input) {
            if (input.fulfills) {
                inputTransactions.push(input.fulfills.transaction_id);
            }
        });
    });
    var unspents = txList.filter(function (tx) {
        return inputTransactions.indexOf(tx.id) === -1;
    });
    if (unspents.length) {
        var _ret = function () {
            var tipTransaction = unspents[0];
            var tipTransactionId = tipTransaction.inputs[0].fulfills.transaction_id;
            var sortedTxList = [];
            while (true) {
                // eslint-disable-line no-constant-condition
                sortedTxList.push(tipTransaction);
                try {
                    tipTransactionId = tipTransaction.inputs[0].fulfills.transaction_id;
                } catch (e) {
                    break;
                }
                if (!tipTransactionId) {
                    break;
                }
                tipTransaction = txList.filter(function (tx) {
                    return (// eslint-disable-line no-loop-func, prefer-destructuring
                        tx.id === tipTransactionId
                    );
                })[0];
            }
            return {
                v: sortedTxList.reverse()
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    } else {
        console.error('something went wrong while sorting transactions', txList, inputTransactions);
    }
    return txList;
}