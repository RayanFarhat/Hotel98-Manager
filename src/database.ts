
// typescript can't find db prop in window
declare global {
    interface Window {
        db: any;
    }
}

export async function createDB() {
    await window.db.create();
}


export type Rent = {
    id: number,
    fromDate: string,
    toDate: string,
    takers: string,
    price: number,
    roomNumber: number,
};

export async function readDB() {
    return await window.db.read() as Rent[];
}

// when add, id prop isn't important
export async function addDB(rent: Rent) {
    await window.db.add(rent);
}

export async function updateDB(rent: Rent) {
    await window.db.update(rent);
}

export async function removeDB(id: number) {
    await window.db.remove(id);
}