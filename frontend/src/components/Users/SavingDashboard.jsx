import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaTrash, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addSavingAPI, deleteSavingAPI, getSavingsAPI, updateSavingAPI } from "../../services/savings/savingService";
import axios from "axios";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

const SavingDashboard = () => {
  const [savingsGoal, setSavingsGoal] = useState(null); // Current savings goal
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [currentSavings, setCurrentSavings] = useState(0); // Current savings

  const [filters, setFilters] = useState({
      endDate: ""
    });

  //fetching
  const {
    data: savingGoalData,
    isLoading: savingLoading,
    error: savingErr,
  } = useQuery({
    queryFn: getSavingsAPI,
    queryKey: ["get-saving"],
  });

  useEffect(() => {
    if (savingGoalData) {
      setSavingsGoal({
        targetAmount: savingGoalData.amount,
        targetDate: savingGoalData.endDate.toString().split("T")[0],
        id: savingGoalData._id,
      });
      setFilters({endDate: savingGoalData.endDate });
    }
  }, [savingGoalData]);

  const {
      data: transactions,
      isError,
      isLoading,
      isFetched,
      error,
      refetch,
    } = useQuery({
      queryFn: () => listTransactionsAPI(filters),
      queryKey: ["list-transactions", filters],
    });

    let income = 0;
    let expenditure = 0; // Total expenditure till now

    if (transactions && Array.isArray(transactions)) {
        transactions.forEach((transaction) => {
          if (transaction.type === "income") {
            income += transaction.amount;
          } else if (transaction.type === "expense") {
            expenditure += transaction.amount;
          }
        });
    }

  // Calculate current savings
  useEffect(() => {
    setCurrentSavings(income - expenditure);
  }, [income, expenditure]);

  //add and update
  const {
    mutateAsync,
    isPending,
    isError: isAddTranErr,
    error: transErr,
    isSuccess,
  } = useMutation({
    mutationFn: addSavingAPI,
    mutationKey: ["add-saving"],
  });

  const {
        mutateAsync: updateSaving,
        isPendingg,
        isError: isUpdateTranErr,
        error: updateErr,
        isSuccesss,
      } = useMutation({
        mutationFn: updateSavingAPI,
        mutationKey: ["update-saving"],
      });

  // Formik for handling the savings goal form
  const formik = useFormik({
    initialValues: {
      targetAmount: savingsGoal?.targetAmount || "",
      targetDate: savingsGoal?.targetDate || "",
      id: savingsGoal?.id || "",
    },
    enableReinitialize: true, // Update form values when savingsGoal changes
    validationSchema: Yup.object({
      targetAmount: Yup.number()
        .required("Target amount is required")
        .positive("Amount must be positive"),
      targetDate: Yup.date().required("Target end date is required"),
    }),
    onSubmit: (values) => {
        if(!isEditing){
        mutateAsync({
            amount: values.targetAmount,
            endDate: values.targetDate
        })
        .then((data) => {
            setSavingsGoal(values); // Save the goal
            setIsEditing(false); // Exit edit mode
            console.log(data);
        })
        .catch((e) => console.log(e));
        }
        else{
            updateSaving({
                amount: values.targetAmount,
                endDate: values.targetDate,
                id: savingsGoal.id
            })
            .then((data) => {
                setSavingsGoal(values); // Save the goal
                setIsEditing(false); // Exit edit mode
                console.log(data);
            })
            .catch((e) => console.log(e));
        }
    },
  });


  const {mutateAsync : deleteSaving} = useMutation({
    mutationFn: deleteSavingAPI,
    mutationKey: ["delete"],
  });

  // Handle delete goal
  const handleDeleteGoal = () => {

    setSavingsGoal(null); // Clear the savings goal
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Savings Goal Tracker
      </h1>

      {/* Current Savings */}
      <div className="bg-green-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Current Savings</h2>
        <p className="text-lg text-gray-800">
          <FaDollarSign className="inline text-green-500" /> {currentSavings}
        </p>
      </div>

      {/* Savings Goal Information */}
      {savingsGoal ? (
        <div className="bg-blue-100 p-4 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Current Savings Goal
          </h2>
          <p>
            <strong>Target Amount:</strong> ${savingsGoal.targetAmount}
          </p>
          <p>
            <strong>Target End Date:</strong> {savingsGoal.targetDate}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
            <button
              onClick={handleDeleteGoal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaTrash className="inline mr-2" /> Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No savings goal set. Please add a new savings goal below.
        </p>
      )}

      {/* Savings Goal Form */}
      {(!savingsGoal || isEditing) && (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {isEditing ? "Edit Savings Goal" : "Set Savings Goal"}
          </h2>

          {/* Target Amount Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="targetAmount" className="text-gray-700 font-medium">
              <FaDollarSign className="inline mr-2 text-blue-500" /> Target
              Amount
            </label>
            <input
              type="number"
              {...formik.getFieldProps("targetAmount")}
              id="targetAmount"
              placeholder="Enter target amount"
              className="border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {formik.touched.targetAmount && formik.errors.targetAmount && (
              <p className="text-red-500 text-sm">{formik.errors.targetAmount}</p>
            )}
          </div>

          {/* Target Date Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="targetDate" className="text-gray-700 font-medium">
              <FaCalendarAlt className="inline mr-2 text-blue-500" /> Target End
              Date
            </label>
            <input
              type="date"
              {...formik.getFieldProps("targetDate")}
              id="targetDate"
              className="border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {formik.touched.targetDate && formik.errors.targetDate && (
              <p className="text-red-500 text-sm">{formik.errors.targetDate}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              {isEditing ? "Update Goal" : "Set Goal"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SavingDashboard;
