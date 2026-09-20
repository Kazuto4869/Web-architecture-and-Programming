from fastapi import FastAPI, HTTPException, Body, Query, Response
from fastapi.staticfiles import StaticFiles
app = FastAPI()

# @app.get('/slow')
# async def slow():
#     await asyncio.sleep(2)
#     return {"message": "This is a slow response"}


# @app.get("/")
# def read_root():
#     return {"Message": "Hello, World!"}

# @app.get("/hello/{name}")
# def hello(name: str):
#     return {"greeting": f"Hello, {name}!"}

# @app.get("/add")
# def add(a: int, b: int):
#     return {"a": a, "b": b, "sum": a + b}

_items = []
_next_id = 1


@app.get("/items")
def list_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    return _items[skip:skip + limit]


@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in _items:
        if item["id"] == item_id:
            return item

    raise HTTPException(
        status_code=404,
        detail="Item not found"
    )


@app.post("/items", status_code=201)
def create_item(
    name: str = Body(...),
    price: float = Body(...)
):
    global _next_id

    new_item = {
        "id": _next_id,
        "name": name,
        "price": price
    }

    _items.append(new_item)
    _next_id += 1

    return new_item


@app.put("/items/{item_id}")
def update_item(
    item_id: int,
    name: str = Body(...),
    price: float = Body(...)
):
    for old_item in _items:
        if old_item["id"] == item_id:
            old_item["name"] = name
            old_item["price"] = price

            return old_item

    raise HTTPException(
        status_code=404,
        detail="Item not found"
    )


@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int):
    for item in _items:
        if item["id"] == item_id:
            _items.remove(item)

            return Response(status_code=204)

    raise HTTPException(
        status_code=404,
        detail="Item not found"
    )
    
app.mount(
    "/static",
    StaticFiles(directory=".", html=True),
    name="static"
)