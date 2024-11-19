async function test(stuff) {
  const res = await fetch("http://localhost:3000/api/item-masterlist/insert", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      item_code: stuff,
      item_desc: "sdfsdf",
      unit: "ROLL",
    }),
  });
  // console.log(await (await fetch("http://localhost:3000/api/item-masterlist/all")).json());
  console.log(await res.json());
}

async function deleter(stuff) {
  const res = await fetch("http://localhost:3000/api/item-masterlist/delete", {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      item_code: stuff,
    }),
  });

  console.log(await res.json());
}

async function caller() {
  await deleter("0123231sf");
  await deleter("0123231sf4");
  await deleter("0123231sf44");
}

// caller()
// test("012323sdf1sf44")
deleter("012323sdf1sf44");
