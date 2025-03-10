'use client'
import React from 'react';

type SubscriptionType = {
    id: number;
    name: string;
    description: string;
    monthlyPrice: string;
    yearlyPrice: string;
    features: string[];
};

const subscriptionTypes: SubscriptionType[] = [
    {
        id: 1,
        name: 'Базовая',
        description: 'Базовая подписка с ограниченным функционалом.',
        monthlyPrice: '163.5 RUP/месяц',
        yearlyPrice: '1962 RUP/год',
        features: [
            'Доступ к базовым инструментам',
            'Ограниченная поддержка',
            'Доступ к сообществу'
        ],
    },
    {
        id: 2,
        name: 'Стандартная',
        description: 'Стандартная подписка с большинством функций.',
        monthlyPrice: '327 RUP/месяц',
        yearlyPrice: '3924 RUP/год',
        features: [
            'Все из базовой подписки',
            'Приоритетная поддержка',
            'Расширенная аналитика'
        ],
    },
    {
        id: 3,
        name: 'Премиум',
        description: 'Премиум подписка со всеми функциями.',
        monthlyPrice: '490.50 RUP/месяц',
        yearlyPrice: '5886 RUP/год',
        features: [
            'Все функции стандартной подписки',
            'Выделенный менеджер аккаунта',
            'Пользовательские интеграции',
            'Премиум поддержка 24/7'
        ],
    },
];

const getDisplayedPrice = (
    subscription: SubscriptionType,
    period: 'monthly' | 'quarterly' | 'yearly'
): string => {
    if (period === 'monthly') return subscription.monthlyPrice;
    if (period === 'yearly') return subscription.yearlyPrice;
    // For quarterly, calculate based on the monthly price
    const monthlyNumber = parseFloat(subscription.monthlyPrice);
    if (isNaN(monthlyNumber)) return subscription.monthlyPrice;
    const quarterlyPrice = (monthlyNumber * 3).toFixed(2);
    return `${quarterlyPrice} RUP/3 месяца`;
};

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '100%',
                position: 'relative'
            }}>
                {children}
                <button
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const SubscriptionPage: React.FC = () => {
    const [period, setPeriod] = React.useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
    const [selectedSubscription, setSelectedSubscription] = React.useState<SubscriptionType | null>(null);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const handleSelect = (subscription: SubscriptionType) => {
        setSelectedSubscription(subscription);
        setShowModal(true);
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
                Выберите подписку
            </h1>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <label htmlFor="period-select" style={{ marginRight: '0.5rem', fontSize: '1rem', color: '#333' }}>
                    Выберите период подписки:
                </label>
                <select
                    id="period-select"
                    value={period}
                    onChange={e => setPeriod(e.target.value as 'monthly' | 'quarterly' | 'yearly')}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                >
                    <option value="monthly">Ежемесячно</option>
                    <option value="quarterly">3 месяца</option>
                    <option value="yearly">Ежегодно</option>
                </select>
            </div>
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
                            marginBottom: '1рем'
                        }}>
                            {subscription.description}
                        </p>
                        <p style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem'
                        }}>
                            {getDisplayedPrice(subscription, period)}
                        </p>
                        <div style={{
                            textAlign: 'left',
                            marginBottom: '1.5rem'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Особенности:</h4>
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
                            Выбрать {subscription.name}
                        </button>
                    </div>
                ))}
            </div>
            {showModal && selectedSubscription && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2 style={{ color: '#007acc', marginBottom: '1rem' }}>
                        Подтверждение выбранной подписки
                    </h2>
                    <p style={{ marginBottom: '0.5rem' }}>
                        Вы выбрали: <strong>{selectedSubscription.name}</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                        Описание: {selectedSubscription.description}
                    </p>
                    <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                        Цена: {getDisplayedPrice(selectedSubscription, period)}
                    </p>
                    <button
                        style={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#218838')}
                        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#28a745')}
                        onClick={() => {
                            console.log('Proceeding with subscription:', selectedSubscription);
                            // Replace with desired action (e.g., redirect to payment page)
                        }}
                    >
                        Продолжить подписку
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default SubscriptionPage;