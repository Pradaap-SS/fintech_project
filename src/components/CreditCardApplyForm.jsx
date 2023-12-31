import React, { useState, useEffect } from 'react';

const CreditCardApplyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    phoneNumber: '',
    bankAccountNumber: '',
    employmentStatus: '',
    annualIncome: '',
    monthlyHousingRent: '',
    numExistingCreditCards: '',
    creditScore: '',
    username: '',
    //creditcardname: '',
  });

  const loggedInUser = localStorage.getItem('loggedInUser');

  const cardType = localStorage.getItem('cardName');

  useEffect(() => {
    // Pre-populate the username if the user is logged in
    if (loggedInUser) {
      setFormData((prevData) => ({
        ...prevData,
        username: loggedInUser,
      }));
    }
  }, [loggedInUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreditCardApproval = () => {
    // Example conditions for credit card approval
    const {
      annualIncome,
      monthlyHousingRent,
      numExistingCreditCards,
      creditScore,
    } = formData;

    // Basic conditions (customize as needed)
    if (
      parseInt(annualIncome, 10) >= 50000 &&
      parseInt(monthlyHousingRent, 10) <= 2000 &&
      parseInt(numExistingCreditCards, 10) <= 2 &&
      parseInt(creditScore, 10) >= 700
    ) {
      return true; // Approved
    } else {
      return false; // Disapproved
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const cardNames = {
      sapphire: "SAPPHIRE PREFERRED® CREDIT CARD",
      freedomunlimited: "FREEDOM UNLIMITED® CREDIT CARD",
      freedomflex: "FREEDOM FLEX® CREDIT CARD"
    };
   // const cardType = cardNames[window.location.pathname.split('/').pop()]; // Extract card type from URL
    

    try {
        // Credit card approval check
        const isApproved = handleCreditCardApproval();
        const status = isApproved ? 'Approved' : 'Disapproved';

        

        /*const cardName = determineCreditCardName(); // Implement a function to determine the card name
        setFormData({
        ...formData,
        creditcardname: cardName,
        });*/
  
        if (isApproved) {
          alert('Congratulations! Your credit card application has been approved!');
          console.log('Credit card application approved');
        } else {
          alert('Sorry, your credit card application has been disapproved.');
          console.log('Credit card application disapproved');
          //return; // Do not proceed with submission if disapproved
        }
  
        // Continue with form submission to the server
        const response = await fetch('http://localhost:8008/api/credit-card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify(formData),
          body: JSON.stringify({ ...formData, status, creditcardname: cardType }),
        });

      if (response.ok) {
        alert('Your credit card application has been received!!');
        console.log('Credit card application submitted successfully');
        setFormData({
          fullName: '',
          dateOfBirth: '',
          ssn: '',
          email: '',
          phoneNumber: '',
          bankAccountNumber: '',
          employmentStatus: '',
          annualIncome: '',
          monthlyHousingRent: '',
          numberOfExistingCreditCards: '',
          creditScore: '',
        });
      } else {
        console.error('Failed to submit credit card application');
      }
    } catch (error) {
      console.error('Error submitting credit card application:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Credit Card Application</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-600">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-600">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="ssn" className="text-sm font-medium text-gray-600">
            SSN:
          </label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.ssn}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bankAccountNumber" className="text-sm font-medium text-gray-600">
            Bank Account Number:
          </label>
          <input
            type="text"
            id="bankAccountNumber"
            name="bankAccountNumber"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.bankAccountNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="employmentStatus" className="text-sm font-medium text-gray-600">
            Employment Status:
          </label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.employmentStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Employment Status</option>
            <option value="student">Student</option>
            <option value="working professional">Working Professional</option>
            <option value="business owner">Business Owner</option>
            <option value="retired">Retired</option>
            <option value="none of the above">None of the Above</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="annualIncome" className="text-sm font-medium text-gray-600">
            Annual Income:
          </label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.annualIncome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="monthlyHousingRent" className="text-sm font-medium text-gray-600">
            Monthly Housing Rent:
          </label>
          <input
            type="number"
            id="monthlyHousingRent"
            name="monthlyHousingRent"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.monthlyHousingRent}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="numExistingCreditCards" className="text-sm font-medium text-gray-600">
            Number of Existing Credit Cards:
          </label>
          <input
            type="number"
            id="numExistingCreditCards"
            name="numExistingCreditCards"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.numExistingCreditCards}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="creditScore" className="text-sm font-medium text-gray-600">
            Credit Score:
          </label>
          <input
            type="number"
            id="creditScore"
            name="creditScore"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.creditScore}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreditCardApplyForm;
