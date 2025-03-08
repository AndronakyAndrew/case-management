'use client'
import React from 'react';

type SubscriptionType = {
    id: number;
    name: string;
    description: string;
    price: string;
    features: string[];
};

const subscriptionTypes: SubscriptionType[] = [
    {
        id: 1,
        name: 'Basic',
        description: 'Basic subscription with limited features.',
        price: '$9.99/month',
        features: [
            'Access to basic tools',
            'Limited support',
            'Community access'
        ],
    },
    {
        id: 2,
        name: 'Standard',
        description: 'Standard subscription with most features.',
        price: '$19.99/month',
        features: [
            'Everything in Basic',
            'Priority support',
            'Advanced analytics'
        ],
    },
    {
        id: 3,
        name: 'Premium',
        description: 'Premium subscription with all features.',
        price: '$29.99/month',
        features: [
            'All Standard features',
            'Dedicated account manager',
            'Custom integrations',
            '24/7 premium support'
        ],
    },
];

const SubscriptionPage: React.FC = () => {

    const handleSelect = (subscription: SubscriptionType) => {
        alert(`Selected: ${subscription.name} plan`);
        // Replace the alert with additional functionality as needed
    };

    return (
        <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #f4f8fb, #e9eff5)',
            minHeight: '100vh'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '2rem',
                fontSize: '2rem',
                color: '#333'
            }}>
                Choose Your Subscription
            </h1>
            <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {subscriptionTypes.map(subscription => (
                    <div
                        key={subscription.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '2rem',
                            borderRadius: '12px',
                            flex: '1 1 300px',
                            maxWidth: '350px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <h2 style={{
                            fontSize: '1.5rem',
                            color: '#007acc',
                            marginBottom: '1rem'
                        }}>
                            {subscription.name}
                        </h2>
                        <p style={{
                            color: '#666',
                            marginBottom: '1rem'
                        }}>
                            {subscription.description}
                        </p>
                        <p style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem'
                        }}>
                            {subscription.price}
                        </p>
                        <div style={{
                            textAlign: 'left',
                            marginBottom: '1.5rem'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Features:</h4>
                            <ul style={{
                                listStyle: 'disc',
                                paddingLeft: '1.2rem',
                                margin: 0,
                                color: '#555'
                            }}>
                                {subscription.features.map(feature => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            style={{
                                backgroundColor: '#007acc',
                                color: '#fff',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#005fa3')}
                            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007acc')}
                            onClick={() => handleSelect(subscription)}
                        >
                            Select {subscription.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPage;