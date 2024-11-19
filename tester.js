async function test(stuff) {
  const res = await fetch("http://localhost:3000/api/item-masterlist/insert/", {
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
  const res = await fetch("http://localhost:3000/api/item-masterlist/delete/", {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      item_code: stuff,
    }),
  });



  console.log(await res.json());
}

async function put(stuff) {
  const res = await fetch("http://localhost:3000/api/item-masterlist/modify/", {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      item_code: stuff,
      item_desc: "ASDF FDA",
      unit: "ROLL",
    })
  })
  console.log(await res.json());

}

async function caller() {
  await deleter("012323sdf1sf44");
  await test("012323sdf1sf44")
  await put("012323sdf1sf44")
}

// deleter("012323sdf1sf44");

caller()