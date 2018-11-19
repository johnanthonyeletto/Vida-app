@component('mail::message')

# You have been invited by {{ $company->name }} to create a Vida account.

Here's how to get started:

1. Make sure you have the Vida app.
2. In the Vida app, click **Have a signup code? Make an account.**
3. Enter the email address where you received this message and the following code:
<br/>
<br/>
# {{$code}}
4. Click continue and complete the account signup process.

### Welcome to Vida.
Sincerely,
<br/>
*The Vida Team*
@endcomponent
