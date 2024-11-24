import React from 'react';
import Heading1 from './text/Heading1';

const Certifications = () => {
    return (
        <div className='mx-4'>
            <Heading1 text='Volunteering Work' />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative overflow-hidden">
                    <img src="img1.jpg" alt="Description 1" className="object-contain transform transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="relative overflow-hidden">
                    <img src="img2.jpg" alt="Description 2" className="object-contain transform transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="relative overflow-hidden">
                    <img src="img3.jpg" alt="Description 3" className="object-contain transform transition-transform duration-500 hover:scale-110" />
                </div>
            </div>
            <Heading1 text='Certificates' />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative overflow-hidden ">
                    {/* <img src="img4.jpg" alt="Description 1" className="object-contain transform transition-transform duration-500 hover:scale-110" /> */}
                </div>
                <div className="relative overflow-hidden ">
                    <img src="img4.jpg" alt="Description 1" className="object-contain transform transition-transform duration-500 hover:scale-110" />
                </div>
            </div>

        </div>
    );
};

export default Certifications;