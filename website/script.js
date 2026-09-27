const { useState } = React;

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setStatus({
            type: "",
            message: ""
        });

        try {
            const response = await fetch(
                "https://hjf3crttfi.execute-api.ap-south-1.amazonaws.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to send message."
                );
            }

            setStatus({
                type: "success",
                message: result.message
            });

            setFormData({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {
            console.error("Error:", error);

            setStatus({
                type: "error",
                message: "Unable to send message. Please try again."
            });

        } finally {
            setLoading(false);
        }
    };

    return React.createElement(
        "main",
        { className: "page" },

        React.createElement(
            "section",
            { className: "container" },

            React.createElement(
                "div",
                { className: "intro" },

                React.createElement(
                    "span",
                    { className: "badge" },
                    "AWS SERVERLESS PROJECT"
                ),

                React.createElement(
                    "h1",
                    null,
                    "Let's connect."
                ),

                React.createElement(
                    "p",
                    null,
                    "A modern serverless contact form powered by React and AWS managed services."
                ),

                React.createElement(
                    "div",
                    { className: "tech" },
                    "React • JavaScript • API Gateway • Lambda • CloudWatch"
                )
            ),

            React.createElement(
                "div",
                { className: "form-card" },

                React.createElement(
                    "h2",
                    null,
                    "Send a message"
                ),

                React.createElement(
                    "p",
                    null,
                    "Fill in the form below and your message will be processed by AWS."
                ),

                React.createElement(
                    "form",
                    { onSubmit: handleSubmit },

                    React.createElement(
                        "div",
                        { className: "form-group" },

                        React.createElement(
                            "label",
                            { htmlFor: "name" },
                            "Name"
                        ),

                        React.createElement("input", {
                            type: "text",
                            id: "name",
                            name: "name",
                            placeholder: "Your name",
                            value: formData.name,
                            onChange: handleChange,
                            required: true
                        })
                    ),

                    React.createElement(
                        "div",
                        { className: "form-group" },

                        React.createElement(
                            "label",
                            { htmlFor: "email" },
                            "Email"
                        ),

                        React.createElement("input", {
                            type: "email",
                            id: "email",
                            name: "email",
                            placeholder: "you@example.com",
                            value: formData.email,
                            onChange: handleChange,
                            required: true
                        })
                    ),

                    React.createElement(
                        "div",
                        { className: "form-group" },

                        React.createElement(
                            "label",
                            { htmlFor: "message" },
                            "Message"
                        ),

                        React.createElement("textarea", {
                            id: "message",
                            name: "message",
                            placeholder: "Write your message...",
                            rows: 5,
                            value: formData.message,
                            onChange: handleChange,
                            required: true
                        })
                    ),

                    React.createElement(
                        "button",
                        {
                            type: "submit",
                            disabled: loading
                        },
                        loading ? "Sending..." : "Send Message"
                    ),

                    status.message &&
                        React.createElement(
                            "p",
                            {
                                className: `response ${status.type}`
                            },
                            status.message
                        )
                )
            )
        )
    );
}

ReactDOM
    .createRoot(document.getElementById("root"))
    .render(React.createElement(ContactForm));
