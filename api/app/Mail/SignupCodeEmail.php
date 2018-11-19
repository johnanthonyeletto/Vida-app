<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use App\Models\SignupCode;
use App\Models\Company;


class SignupCodeEmail extends Mailable
{
    public $code;
    public $company;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($code, Company $company)
    {
        $this->code = $code;
        $this->company = $company;
    }

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
