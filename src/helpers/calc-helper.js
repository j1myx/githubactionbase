const moment = require('moment')

/**
 * Evaluar la cantidad de commits.
 */
const evaluateCommitsQuantity = (commits) => {
    if (commits >= 8) {
        return 1;
    } else if (commits >= 6 && commits <= 7) {
        return 2;
    } else if (commits === 5) {
        return 3;
    } else if (commits >= 3 && commits <= 4) {
        return 4;
    } else if (commits >= 1 && commits <= 2) {
        return 5;
    }
}

/**
 * Evaluar la cantidad de archivos por commit
 */
const evaluateCommitFilesQuantity = (files) => {
    if (files >= 40) {
        return 1;
    } else if (files >=30 && files < 40) {
        return 2;
    } else if (files >= 20 && files < 30) {
        return 3;
    } else if (files >= 15 && files < 20) {
        return 4;
    } else if (files < 15) {
        return 5;
    }
}

/**
 * Evaluar la cantidad de lineas modificadas
 * 1. Es usado para validar la cantidad de lineas por archivo.
 * 2. Es usado para validar la cantidad de lineas por pull request.
 */
const evaluateLinesQuantity = (lines) => {
    if (lines >= 350) {
        return 1;
    } else if (lines >=250 && lines < 350) {
        return 2;
    } else if (lines >= 150 && lines < 250) {
        return 3;
    } else if (lines >= 100 && lines < 150) {
        return 4;
    } else if (lines < 100) {
        return 5;
    }
}

/**
 * Evaluar la cantidad de aprovadores
 */
const evaluateReviewersQuantity = (reviewers) => {
    let reviewersPoints = 0

    if (reviewers === 1) {
        reviewersPoints = 3
    } else if (reviewers === 2) {
        reviewersPoints = 4
    } else if (reviewers > 2) {
        reviewersPoints = 5
    }

    return reviewersPoints
}

/**
 * 
 * @param {number} hours 
 * @param {number} complexity 
 * @returns 
 */
const evaluateTimeQuantity = (hours, complexity) => {
    if (3 < complexity && complexity <= 5) {
        if (hours > 32) {
            return 1
        } else if (20 < hours && hours <= 32) {
            return 2
        } else if (8 < hours && hours <= 20) {
            return 3
        } else if (4 < hours && hours <= 8) {
            return 4
        } else if (hours <= 4) {
            return 5
        }
    } else if (0 <= complexity && complexity <= 3) {
        if (hours > 32 || hours <= 0.5) {
            return 1
        } else if ((20 < hours && hours <= 32) || (0.5 < hours && hours <= 1)) {
            return 2
        } else if (8 < hours && hours <= 20) {
            return 3
        } else if (4 < hours && hours <= 8) {
            return 4
        } else if (hours <= 4) {
            return 5
        }
    }

    return 0
}

const getHoursDiff = (date) => {
    const prCreated = moment(date, "YYYY-MM-DD'T'HH:mm:ss").subtract(5, 'hours')

    return moment().diff(prCreated, 'hours', true).toFixed(1)
}

module.exports = {
    evaluateCommitsQuantity,
    evaluateCommitFilesQuantity,
    evaluateLinesQuantity,
    evaluateReviewersQuantity,
    evaluateTimeQuantity,
    getHoursDiff
}