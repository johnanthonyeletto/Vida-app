<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class SignupCodeEmail extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('SignupCodeEmail')->subject('Welcome to Vida 💙');
    }
}