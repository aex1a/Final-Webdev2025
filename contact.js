document.addEventListener("DOMContentLoaded", () => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydJ0Cb-ImecVdVZEKP19sTKMZ_f_c4YH04tZh_g8uxWGSjc2j1w7Ntc_RhseWmWZHTpw/exec";

    const form = document.getElementById("inquiryForm");
    const statusEl = document.getElementById("status");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        statusEl.textContent = "";
        statusEl.className = "status";
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const formData = new FormData(form);

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });

            statusEl.textContent = "Your Message has been sent! Thank you for contacting us.";
            statusEl.className = "status success";
            form.reset();
        } catch (err) {
            console.error(err);
            statusEl.textContent = "Something went wrong. Please try again.";
            statusEl.className = "status error";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });
});