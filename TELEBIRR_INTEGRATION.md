# Tele Birr Integration Setup Guide

## Environment Variables Required

Add these environment variables to your `.env` file:

```bash
# Tele Birr API Configuration
REACT_APP_TELEBIRR_API_KEY=your-telebirr-api-key-here
REACT_APP_MERCHANT_ID=gasha-vpn-merchant
REACT_APP_TELEBIRR_BASE_URL=https://api.telebirr.com
REACT_APP_CALLBACK_URL=https://your-domain.com/payment/callback

# Production Tele Birr API Endpoints
TELEBIRR_PAYMENT_URL=https://api.telebirr.com/v1/payment/initiate
TELEBIRR_STATUS_URL=https://api.telebirr.com/v1/payment/status
TELEBIRR_SMS_URL=https://api.telebirr.com/v1/sms/send

# Development/Testing (Optional)
REACT_APP_TELEBIRR_SANDBOX=true
REACT_APP_TELEBIRR_TEST_MODE=false
```

## Tele Birr API Integration Features

### 1. Payment Processing
- **Real-time payment initiation** via Tele Birr API
- **Secure payment redirection** to Tele Birr payment page
- **Payment status polling** for real-time updates
- **Transaction ID tracking** for audit purposes

### 2. SMS Integration
- **Download link delivery** via Tele Birr SMS
- **Payment confirmation** messages
- **Error notifications** for failed payments

### 3. Security Features
- **Phone number validation** (Ethiopian format)
- **Transaction ID generation** with timestamps
- **Secure API key authentication**
- **Callback URL verification**

## Implementation Details

### Payment Flow
1. User selects platform (Android/Windows)
2. User enters Tele Birr phone number
3. System validates phone number format
4. Payment initiated via Tele Birr API
5. User redirected to Tele Birr payment page
6. System polls for payment status
7. On success: Download link sent via SMS
8. User receives download link on their phone

### Pricing Structure
- **Android Premium**: 50 ETB
- **Windows Premium**: 75 ETB
- **One-time payment** (no subscriptions)

### Error Handling
- **Payment failures** with retry options
- **Network timeouts** with user feedback
- **Invalid phone numbers** with format guidance
- **API errors** with fallback mechanisms

## Testing

### Development Mode
- Mock API responses for testing
- Simulated payment success/failure
- Console logging for debugging

### Production Mode
- Real Tele Birr API integration
- Live payment processing
- SMS delivery confirmation

## Security Considerations

1. **API Key Protection**: Store securely in environment variables
2. **Phone Number Validation**: Ethiopian format verification
3. **Transaction Security**: Unique transaction IDs
4. **Callback Verification**: Secure callback URL handling
5. **Data Privacy**: Minimal data collection and storage

## Support

For Tele Birr API issues:
- Contact Tele Birr developer support
- Check API documentation
- Monitor transaction logs
- Implement proper error handling

