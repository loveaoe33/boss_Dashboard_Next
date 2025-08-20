



export async function getWeekAmount(url: string) {
    const respose = await fetch(`/api/caseAmount?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function getDayAmount(url: string) {
    const respose = await fetch(`/api/caseAmount?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

}


export async function getYearAmount(url: string) {

    const respose = await fetch(`/api/caseAmount?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

}


export async function getLastYearAmount(url: string) {

    const respose = await fetch(`/api/caseAmount?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });


}


export async function getCaseSelectAmount(url:string, caseJson:string) {
    const respose = await fetch(`/api/caseAmount?url=${encodeURIComponent(url)}&sqlSelect=${encodeURIComponent(caseJson)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}
