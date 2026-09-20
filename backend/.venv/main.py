from fastapi import FastAPI, HTTPException, Body, Query, Response
from fastapi.staticfiles import StaticFiles

app = FastAPI()

_items = []
_next_id = 1


# Part A
@app.patch("/items/{item_id}")
def patch_item(item_id: int, updates: dict = Body(...)):
    for item in _items:
        if item["id"] == item_id:

            if "name" in updates:
                new_name = updates["name"]

                for other in _items:
                    if (
                        other["id"] != item_id
                        and other["name"].lower() == new_name.lower()
                    ):
                        raise HTTPException(
                            status_code=409,
                            detail="Item with this name already exists"
                        )

                item["name"] = new_name

            if "price" in updates:
                item["price"] = updates["price"]

            return item

    raise HTTPException(
        status_code=404,
        detail="Item not found"
    )


# Part B
@app.get("/items")
def list_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    min_price: float | None = None,
    max_price: float | None = None,
    q: str | None = Query(None, min_length=2),
    sort_by: str = Query("id", pattern="^(id|name|price)$"),
    order: str = Query("asc", pattern="^(asc|desc)$")
):
    result = _items.copy()

    if min_price is not None:
        result = [
            item for item in result
            if item["price"] >= min_price
        ]

    if max_price is not None:
        result = [
            item for item in result
            if item["price"] <= max_price
        ]

    if q is not None:
        result = [
            item for item in result
            if q.lower() in item["name"].lower()
        ]

    result.sort(
        key=lambda item: item[sort_by],
        reverse=(order == "desc")
    )

    # Part D
    total = len(result)
    result = result[skip:skip + limit]

    return {
        "items": result,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in _items:
        if item["id"] == item_id:
            return item

    raise HTTPException(
        status_code=404,
        detail="Item not found"
    )


# Part C
@app.post("/items", status_code=201)
def create_item(
    name: str = Body(...),
    price: float = Body(...)
):
    global _next_id

    for item in _items:
        if item["name"].lower() == name.lower():
            raise HTTPException(
                status_code=409,
                detail="Item with this name already exists"
            )

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
    for item in _items:
        if item["id"] == item_id:

            for other in _items:
                if (
                    other["id"] != item_id
                    and other["name"].lower() == name.lower()
                ):
                    raise HTTPException(
                        status_code=409,
                        detail="Item with this name already exists"
                    )

            item["name"] = name
            item["price"] = price

            return item

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





# Part E
@app.post("/predict/house-price")
def predict_house_price(
    area_sqm: float = Body(..., gt=0),
    bedrooms: int = Body(..., ge=0),
    distance_to_center_km: float = Body(..., ge=0)
):
    price = (
        area_sqm * 15_000_000
        - distance_to_center_km * 5_000_000
        + bedrooms * 20_000_000
    )

    return {
        "predicted_price": price,
        "currency": "VND"
    }


app.mount(
    "/static",
    StaticFiles(directory=".", html=True),
    name="static"
)