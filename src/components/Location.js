import React from 'react';

export default function Location() {
    return (
        <div>
            <h2>Location Of my Store</h2>
            <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1686.1681385388308!2d72.61745409270259!3d23.003686254040787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87cfefeec7bf%3A0x8b73d40e1296022c!2sShri%20K.%20K.%20Shastri%20Government%20Commerce%20College!5e0!3m2!1sen!2sin!4v1710836208133!5m2!1sen!2sin"
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
