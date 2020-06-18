

export function areValidHours(startTime, endTime) {
    // la diferencia entre que comienza y termina la clase debe ser mayor a 2
    return Number(endTime.slice(0,2)) - Number(startTime.slice(0,2)) >= 2 
}

export function isValidCommission(commission) {
    return commission.schedules.length > 0;
}

export function isValidSubject(subject) {
    return subject.commissions.length > 0
}