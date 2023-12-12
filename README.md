## Queue Management System

### Queue Structure:

- **Queue:**
  - Fields: number, date, status

- **Token:**
  - Fields: token, number, date, scanned

### API Endpoints:

#### 1. GET /api/queue

- **Parameters:** ?date=YYYY-MM-DD
- **Description:** Retrieve queues for a specific date.

#### 2. Generate Number in Today's Queue

- **Endpoint:** POST /api/queue
- **Body:** { "number": [number] }
- **Description:** Generate a queue entry for the specified number in today's date.

#### 3. Update Queue Entry

- **Endpoint:** PATCH /api/queue
- **Body:** { "number": [number], "date": [date], "status": [status] }
- **Description:** Update the status of a queue entry for a given number and date.

#### 4. Check Token Availability and Generate Queue

- **Endpoint:** GET /api/queue/token
- **Parameters:** ?token=[token]
- **Description:** Check if the token is available and generate a queue entry if it is.

#### 5. WebSocket Endpoint
- **Endpoint:** ws://`URL`/api/queue/token
- **Description:** WebSocket endpoint for real-time get code.

