import React from 'react'

const VehicelInfo = ({ Model, Number, isVerified, Owner, Capicity }: { Model: String, Number: String, isVerified: Boolean, Owner: String, Capicity: Number }) => {
    return (
        <div className='flex flex-col'>
            <h1 className='text-2xl font-medium'>About Vechile</h1>
            <div className='flex gap-3 pl-4'>
                <div className='flex flex-col'>
                    <h3>Vexhile Model</h3>
                    <h3>Registration No</h3>
                    <h3>Verified</h3>
                    <h3>Owner</h3>
                    <h3>Max Capicity</h3>
                </div>
                <div className='flex flex-col'>
                    <h3>{Model.toString()}</h3>
                    <h3>{Number.toString()}</h3>
                    <h3>{isVerified ? 'Yes' : 'No'}</h3>
                    <h3>{Owner.toString()}</h3>
                    <h3>{Capicity.toFixed()}</h3>
                </div>
            </div>
        </div>
    )
}

export default VehicelInfo
