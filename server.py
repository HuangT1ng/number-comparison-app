from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="FastAPI Backend", description="A simple FastAPI backend")

# In-memory database
items_db = []
item_id_counter = 0
#test
# Item model
class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class Item(ItemBase):
    id: int

# CRUD operations
@app.post("/items/", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemBase):
    global item_id_counter
    item_id_counter += 1
    new_item = Item(id=item_id_counter, **item.model_dump())
    items_db.append(new_item)
    return new_item

@app.get("/items/", response_model=List[Item])
async def read_items():
    return items_db

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item: ItemBase):
    for i, stored_item in enumerate(items_db):
        if stored_item.id == item_id:
            updated_item = Item(id=item_id, **item.model_dump())
            items_db[i] = updated_item
            return updated_item
    raise HTTPException(status_code=404, detail="Item not found")

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    for i, item in enumerate(items_db):
        if item.id == item_id:
            items_db.pop(i)
            return
    raise HTTPException(status_code=404, detail="Item not found")

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend"}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
