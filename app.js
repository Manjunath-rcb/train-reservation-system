document.addEventListener("DOMContentLoaded", function() {
    // Fetch trains
    document.getElementById("fetch-trains").addEventListener("click", function() {
        fetch("http://localhost:3000/api/trains")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("trains-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";
                data.forEach(train => {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = train.train_no;
                    row.insertCell(1).textContent = train.train_name;
                    row.insertCell(2).textContent = train.source;
                    row.insertCell(3).textContent = train.destination;
                    row.insertCell(4).textContent = train.departure_time;
                    row.insertCell(5).textContent = train.arrival_time;
                    row.insertCell(6).textContent = train.total_coaches;
                });
            });
    });

    // Fetch passengers
    document.getElementById("fetch-passengers").addEventListener("click", function() {
        fetch("http://localhost:3000/api/passengers")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("passengers-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";
                data.forEach(passenger => {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = passenger.passenger_id;
                    row.insertCell(1).textContent = passenger.passenger_name;
                    row.insertCell(2).textContent = passenger.age;
                    row.insertCell(3).textContent = passenger.gender;
                    row.insertCell(4).textContent = passenger.contact_no;
                });
            });
    });

    // Fetch coaches
    document.getElementById("fetch-coaches").addEventListener("click", function() {
        fetch("http://localhost:3000/api/coaches")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("coaches-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";
                data.forEach(coach => {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = coach.coach_no;
                    row.insertCell(1).textContent = coach.train_no;
                    row.insertCell(2).textContent = coach.coach_type;
                    row.insertCell(3).textContent = coach.total_seats;
                });
            });
    });

    // Fetch reservations
    document.getElementById("fetch-reservations").addEventListener("click", function() {
        fetch("http://localhost:3000/api/reservations")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("reservations-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";
                data.forEach(reservation => {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = reservation.pnr_no;
                    row.insertCell(1).textContent = reservation.train_no;
                    row.insertCell(2).textContent = reservation.coach_no;
                    row.insertCell(3).textContent = reservation.passenger_id;
                    row.insertCell(4).textContent = reservation.seat_no;
                    row.insertCell(5).textContent = reservation.fare;
                    row.insertCell(6).textContent = reservation.booking_status;
                });
            });
    });

    // Book ticket
    document.getElementById("booking-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const passengerId = document.getElementById("passenger_id").value;
        const trainNo = document.getElementById("train_no").value;
        const coachNo = document.getElementById("coach_no").value;
        const seatNo = document.getElementById("seat_no").value;
        const fare = document.getElementById("fare").value;

        fetch("http://localhost:3000/api/book-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                passenger_id: passengerId,
                train_no: trainNo,
                coach_no: coachNo,
                seat_no: seatNo,
                fare: fare
            })
        })
        .then(response => response.json())
        .then(data => alert(data.message));
    });

    // Cancel ticket
    document.getElementById("cancel-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const pnrNo = document.getElementById("pnr_no").value;

        fetch("http://localhost:3000/api/cancel-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pnr_no: pnrNo })
        })
        .then(response => response.json())
        .then(data => alert(data.message));
    });
});
