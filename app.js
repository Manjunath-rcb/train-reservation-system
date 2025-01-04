document.addEventListener("DOMContentLoaded", function() {

    // Fetch trains
    document.getElementById("fetch-trains").addEventListener("click", function() {
        fetch("http://localhost:3000/api/trains")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.getElementById("trains-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = ""; // Clear existing rows
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
            })
            .catch(err => {
                console.error("Error fetching trains:", err);
                alert("Failed to fetch trains.");
            });
    });

    // Fetch passengers
    document.getElementById("fetch-passengers").addEventListener("click", function() {
        fetch("http://localhost:3000/api/passengers")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("passengers-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = ""; // Clear existing rows
                data.forEach(passenger => {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = passenger.passenger_id;
                    row.insertCell(1).textContent = passenger.passenger_name;
                    row.insertCell(2).textContent = passenger.age;
                    row.insertCell(3).textContent = passenger.gender;
                    row.insertCell(4).textContent = passenger.contact_no;
                });
            })
            .catch(err => {
                console.error("Error fetching passengers:", err);
                alert("Failed to fetch passengers.");
            });
    });

    // Fetch coaches
    document.getElementById("fetch-coaches").addEventListener("click", function() {
        fetch("http://localhost:3000/api/coaches")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("coaches-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = ""; // Clear existing rows
                data.forEach(coach => {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = coach.coach_no;
                    row.insertCell(1).textContent = coach.train_no;
                    row.insertCell(2).textContent = coach.coach_type;
                    row.insertCell(3).textContent = coach.total_seats;
                });
            })
            .catch(err => {
                console.error("Error fetching coaches:", err);
                alert("Failed to fetch coaches.");
            });
    });

    // Fetch reservations
    document.getElementById("fetch-reservations").addEventListener("click", function() {
        fetch("http://localhost:3000/api/reservations")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("reservations-table").getElementsByTagName("tbody")[0];
                tbody.innerHTML = ""; // Clear existing rows
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
            })
            .catch(err => {
                console.error("Error fetching reservations:", err);
                alert("Failed to fetch reservations.");
            });
    });

    // Add Train
    document.getElementById("add-train-form").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const trainData = {
            train_no: document.getElementById("train_no").value,
            name: document.getElementById("train_name").value,
            source: document.getElementById("source").value,
            destination: document.getElementById("destination").value,
            departure: document.getElementById("departure").value,  // Corrected to match ID
            arrival: document.getElementById("arrival").value,      // Corrected to match ID
            total_coaches: document.getElementById("total_coaches").value
        };
    
        fetch("http://localhost:3000/add-train", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trainData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Show success message
            document.getElementById("add-train-form").reset();  // Reset form
        })
        .catch(err => {
            console.error("Error adding train:", err);
            alert("Failed to add train.");
        });
    });
    

    // Add Passenger
    document.getElementById("add-passenger-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const passengerData = {
            name: document.getElementById("passenger_name").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            contact_no: document.getElementById("contact_no").value
        };

        fetch("http://localhost:3000/add-passenger", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passengerData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Show success message
            document.getElementById("add-passenger-form").reset();  // Reset form
        })
        .catch(err => {
            console.error("Error adding passenger:", err);
            alert("Failed to add passenger.");
        });
    });

    // Book Ticket
    document.getElementById("booking-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const bookingData = {
            passenger_id: document.getElementById("passenger_id_booking").value,
            train_no: document.getElementById("train_no_booking").value,
            coach_no: document.getElementById("coach_no_booking").value,
            seat_no: document.getElementById("seat_no_booking").value,
            fare: document.getElementById("fare_booking").value
        };

        fetch("http://localhost:3000/book-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Show success message
            document.getElementById("booking-form").reset();  // Reset form
        })
        .catch(err => {
            console.error("Error booking ticket:", err);
            alert("Failed to book ticket.");
        });
    });

    // Cancel Ticket
    document.getElementById("cancel-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const pnrNo = document.getElementById("pnr_no_cancel").value;

        fetch("http://localhost:3000/cancel-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pnr_no: pnrNo })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Show success message
            document.getElementById("cancel-form").reset();  // Reset form
        })
        .catch(err => {
            console.error("Error canceling ticket:", err);
            alert("Failed to cancel ticket.");
        });
    });

});
