async function test() {
    const res = await fetch("http://localhost:3000/api/item-masterlist/insert", {
        method: "POST",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                item_code: "0123231sf44",
                item_desc: "sdfsdf",
                unit: "ROLL"
            }
        )
    })
    // console.log(await (await fetch("http://localhost:3000/api/item-masterlist/all")).json());
    console.log(await res.json())
}

async function deleter() {
    const res = await fetch("http://localhost:3000/api/item-masterlist/delete", {
        method: "DELETE",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                item_code: "0123231sf44"
            }
        )
    })

    console.log(await res.json())
}

deleter()
