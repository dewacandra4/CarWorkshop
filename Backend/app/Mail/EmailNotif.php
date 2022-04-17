<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailNotif extends Mailable
{
    use Queueable, SerializesModels;

    public $details_email;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details_email)
    {
        $this->details_email = $details_email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('New Notification from CarWorkshop ')
                    ->view('emails.emailnotif');
    }
}
