import asyncio
import json

import uvicorn
from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel

from send_data_emulation import generate_sensors_data

app = FastAPI()

# Глобальная переменная для коэффициента
coefficient = 1.0


# Класс для получения нового значения коэффициента
class Coefficient(BaseModel):
    value: float


# Роут для изменения коэффициента (например {"value": 2.0})
@app.post("/set_coefficient/")
async def set_coefficient(coef: Coefficient):
    global coefficient
    coefficient = coef.value
    return {"message": f"Coefficient set to {coefficient}", "status": "200"}


toggle_generator_work = False


async def generator_task():
    global toggle_generator_work

    while toggle_generator_work:
        print(
            json.dumps(
                generate_sensors_data(),
                indent=2,
            )
        )
        await asyncio.sleep(1)


# Роут для генерации данных
@app.get("/generate_data/")
async def generate_data(background_tasks: BackgroundTasks):
    global toggle_generator_work
    toggle_generator_work = not toggle_generator_work

    if toggle_generator_work:
        print("Generator started")
        background_tasks.add_task(generator_task)
        return {"message": "Generator is started", "status": "200"}
    else:
        print("Generator is stopped")
        return {"message": "Generator is stopped", "status": "200"}


# Запуск приложения
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8008, reload=True)
