const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fintech',
  });

  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/register', (req, res) => {
    const { firstName, lastName, dob, email, username, password } = req.body;
  
    const registerUserQuery =
      'INSERT INTO users (firstName, lastName, dob, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
  
    db.query(
      registerUserQuery,
      [firstName, lastName, dob, email, username, password],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('User registered successfully');
        }
      }
    );
  });

  app.post('/api/home-loan', (req, res) => {
    const {
      email,
      phoneNumber,
      monthlyIncome,
      loanAmount,
      hasCurrentLoan,
      numberOfLoans,
      loanTypes,
      totalLoanAmount,
      //proofOfIncome,
      ssnNumber,
      loanReason,
    } = req.body;
  
    const insertLoanQuery = `INSERT INTO home_loan 
      (email, phoneNumber, monthlyIncome, loanAmount, hasCurrentLoan, numberOfLoans, loanTypes, totalLoanAmount,ssnNumber, loanReason) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(
      insertLoanQuery,
      [
        email,
        phoneNumber,
        monthlyIncome,
        loanAmount,
        hasCurrentLoan,
        numberOfLoans,
        loanTypes,
        totalLoanAmount,
        //proofOfIncome,
        ssnNumber,
        loanReason,
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting loan data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Loan application submitted successfully');
        }
      }
    );
  });
  
  
