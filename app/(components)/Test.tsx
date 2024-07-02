'use client'
import { useState } from 'react';
import { NextPage } from 'next';
import mongoose from 'mongoose';
import { UpdateDriverLocation } from '../api/AvaliableDrivers/DriverUpdate';

const Test: NextPage = () => {
    const [formData, setFormData] = useState({
        current_cell_id: '',
        prev_cell_id: '',
        driver_id: '',
        GO: false
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleDriverUpdate(
                formData.current_cell_id,
                formData.prev_cell_id,
                new mongoose.Types.ObjectId(formData.driver_id),
                formData.GO
            );
            setMessage('Driver location updated successfully.');
        } catch (error) {
            console.error('Error occurred:', error);
            setMessage('An error occurred while updating driver location.');
        }
    };

    const handleDriverUpdate = async (
        current_cell_id: string,
        prev_cell_id: string,
        driver_id: mongoose.Types.ObjectId,
        GO: boolean
    ) => {
        await UpdateDriverLocation(current_cell_id, prev_cell_id, driver_id, GO);
    };

    return (
        <div>
            <h1>Update Driver Location</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="current_cell_id">Current Cell ID:</label>
                <input type="text" id="current_cell_id" name="current_cell_id" value={formData.current_cell_id} onChange={handleChange} required /><br /><br />

                <label htmlFor="prev_cell_id">Previous Cell ID:</label>
                <input type="text" id="prev_cell_id" name="prev_cell_id" value={formData.prev_cell_id} onChange={handleChange} required /><br /><br />

                <label htmlFor="driver_id">Driver ID:</label>
                <input type="text" id="driver_id" name="driver_id" value={formData.driver_id} onChange={handleChange} required /><br /><br />

                <label htmlFor="GO">GO:</label>
                <input type="checkbox" id="GO" name="GO" checked={formData.GO} onChange={handleChange} /><br /><br />

                <button type="submit">Update</button>
            </form>

            <div>{message}</div>
        </div>
    );
};

export default Test;
