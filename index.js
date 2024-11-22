import express, { urlencoded } from "express";
import cors from "cors"
const app = express();
const PORT = 3000;


let CAR_DATA = [
    {
        "carId": "CAR001",
        "carName": "Maruti Suzuki 800",
        "price": 80000,
        "usedTime": "10 years",
        "ownerName": "Rajesh Kumar",
        "carPictureUrl": "https://upload.wikimedia.org/wikipedia/commons/6/64/Suzuki_Alto_800_GL_2007.jpg"
    },
    {
        "carId": "CAR002",
        "carName": "Hyundai Santro",
        "price": 150000,
        "usedTime": "8 years",
        "ownerName": "Anjali Sharma",
        "carPictureUrl": "https://imgs.search.brave.com/_yUypEbkXEzHz4puHtqq_yn3zkAisnE4L_Dzu5lxs4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGlt/Zy5jYXJkZWtoby5j/b20vaW1hZ2VzL2Nh/cmV4dGVyaW9yaW1h/Z2VzLzYzMHg0MjAv/SHl1bmRhaS9TYW50/cm8vNzQ2MC8xNjM2/NTI5MzM2Nzc0L3Np/ZGUtdmlldy0obGVm/dCktOTAuanBnP3Ry/PXctNjY0"
    },
    {
        "carId": "CAR003",
        "carName": "Tata Indica",
        "price": 60000,
        "usedTime": "12 years",
        "ownerName": "Vikram Singh",
        "carPictureUrl": "https://imgs.search.brave.com/AdJU0MegXiRJ5mk1TyftWXTIWhUP6Yqm1K6c8y6d0gc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/LmF1dG9jYXJpbmRp/YS5jb20vdXRpbHMv/SW1hZ2VSZXNpemVy/LmFzaHg_bj1odHRw/czovL2Ntcy5oYXlt/YXJrZXRpbmRpYS5u/ZXQvbW9kZWwvdXBs/b2Fkcy9tb2RlbGlt/YWdlcy9UYXRhLVNh/ZmFyaS0xODEwMjAy/MzEzMTcuanBnJnc9/MzUwJmg9MjUwJnE9/ODUmYz0x"
    },
    {
        "carId": "CAR004",
        "carName": "Honda City",
        "price": 300000,
        "usedTime": "5 years",
        "ownerName": "Priya Verma",
        "carPictureUrl": "https://imgs.search.brave.com/mrL2JhCIq_2Iuld2LDgbjClrePZiNXr01o0LJsUCPcw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGlt/Zy5jYXJkZWtoby5j/b20vaW1hZ2VzL2Nh/cmV4dGVyaW9yaW1h/Z2VzLzkzMHg2MjAv/SG9uZGEvQ2l0eS85/NzEwLzE2Nzc5MTQy/MzgyOTYvZnJvbnQt/bGVmdC1zaWRlLTQ3/LmpwZz9pbXdpZHRo/PTg5MCZpbXBvbGlj/eT1yZXNpemU"
    },
    {
        "carId": "CAR005",
        "carName": "Ford Fiesta",
        "price": 120000,
        "usedTime": "6 years",
        "ownerName": "Arvind Patel",
        "carPictureUrl": "https://imgs.search.brave.com/7euMJCrBoqsBsb2UgKI6LwHYwemAwWvoCYaoFVDpUPY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2MzL0ZvcmRfVmVy/dmVfTlkuanBn"
    },
    {
        "carId": "CAR006",
        "carName": "Chevrolet Beat",
        "price": 75000,
        "usedTime": "9 years",
        "ownerName": "Sita Rao",
        "carPictureUrl": "https://imgs.search.brave.com/-Dg5NBdYlL5Ra-l5yWl84YnEW5Q4HufJsfH2CGPXbDQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzcyL0NoZXZyb2xl/dF9CZWF0X2NvbmNl/cHRfZnJvbnQuanBn"
    },
    {
        "carId": "CAR007",
        "carName": "Nissan Micra",
        "price": 90000,
        "usedTime": "7 years",
        "ownerName": "Karan Mehta",
        "carPictureUrl": "https://imgs.search.brave.com/5788cptpfx1_9xm8XKx8y7I3F56mtvikodJho3lsAAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2RlL05pc3Nhbl9M/ZWFmXzIwMThfKDMx/ODc0NjM5MTU4KV8o/Y3JvcHBlZCkuanBn"
    },
    {
        "carId": "CAR008",
        "carName": "Toyota Corolla",
        "price": 400000,
        "usedTime": "4 years",
        "ownerName": "Sneha Joshi",
        "carPictureUrl": "https://imgs.search.brave.com/Ml1jB4LuD2pOMxniDyDdKFHzwoZZELMv4xk3_D6B4iA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzA0L1RveW90YV9D/YW1yeV8yLjBIX0xF/XzIwMjMxMTIwLmpw/Zw"
    },
    {
        "carId": "CAR009",
        "carName": "Skoda Octavia",
        "price": 350000,
        "usedTime": "5 years",
        "ownerName": "Ravi Gupta",
        "carPictureUrl": "https://imgs.search.brave.com/LxYZ5JLG5Z78JNT1Q0MK4ds8JIpvZqrh5SCpQ3Fjfkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZHJpdmVzcGFy/ay5jb20vNjAweDQw/MC9waC1iaWcvMjAx/Ny8wMS9za29kYS1v/Y3RhdmlhLWV4dGVy/aW9yLTIuanBn"
    },
    {
        "carId": "CAR010",
        "carName": "Mahindra Bolero",
        "price": 200000,
        "usedTime": "8 years",
        "ownerName": "Neha Desai",
        "carPictureUrl": "https://imgs.search.brave.com/zgYg-rfEO6-dqTvQuXPVQcqGYfMob9xh1IbGE6XvIT8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2QwL1NFQVRfQm9s/ZXJvXzMzMEJUXyhj/cm9wcGVkKS5qcGc"
    },
    {
        "carId": "CAR011",
        "carName": "Renault Kwid",
        "price": 85000,
        "usedTime": "3 years",
        "ownerName": "Amit Joshi",
        "carPictureUrl": "https://imgs.search.brave.com/PwVniyDxSUBKvN0N-Z5G9FONFzUeyEnfc5aik0l4Cd0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg1L1JlbmF1bHRf/QXJrYW5hXyhDTUYt/QilfRmFjZWxpZnRf/SU1HXzk5NjEuanBn"
    },
    {
        "carId": "CAR012",
        "carName": "Volkswagen Polo",
        "price": 180000,
        "usedTime": "6 years",
        "ownerName": "Sunita Agarwal",
        "carPictureUrl": "https://imgs.search.brave.com/Prz_JPeSe2hPxqNUW2v4XXL3CAp_xLPspx7fUjP1dGg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2ExLzIwMTVfVm9s/a3N3YWdlbl9Qb2xv/X0dUaV9TLUFfMS44/X0Zyb250LmpwZw"
    }
]

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// all cars data
app.get("/cars", (req, res) => {
    res.json(
        {
            massage: "data fetched successfully",
            data: CAR_DATA
        }
    ).status(200)
})

// find by id car
app.get("/cars/:id", (req, res) => {
    let { id } = req.params
    let findedcar = CAR_DATA.find((car) => {
        return (car.carId == id)
    })
    if (!findedcar) {
        res.json(
            {
                massage: `car not found for id ${id}`,
            }
        ).status(404)
    } else {
        res.json(
            {
                massage: "data fetched successfully",
                data: findedcar
            }
        ).status(200)
    }
})

//add cars

app.post('/add', (req, res) => {

    let { carName, price, ownerName, usedTime, carPictureUrl } = req.body
    let carId = `CAR0${CAR_DATA.length + 1}`
    let addedCar  =  CAR_DATA.push({
        carId,
        carName,
        price,
        ownerName,
        usedTime,
        carPictureUrl
    })

    if(addedCar){
        res.json({
            message: 'car added successfully'
        }).status(200)
    }else{
        res.json({
            message: `unbale to add car`
        }).status(404)
    }
})


app.get("/car/:id", (req, res) => {
    const { id } = req.params
    let index = CAR_DATA.findIndex((car) => { return (car.carId == id) })
    if (index >= 0) {
        let deletedCar = CAR_DATA.splice(index, 1);
        res.json({
            message: 'car delete successfully',
            data: deletedCar
        }).status(200)
    } else {
        res.json({
            message: `can not find car for id ${id}`
        }).status(404)
    }
})

app.get("/health", (req, res) => {
    res.send("server is runing")
})

app.listen(PORT, () => {
    console.log(`app listen on ${PORT}`)
})