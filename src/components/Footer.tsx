interface FooterProps {
    className?: string;
}

const Footer = ({ className }:FooterProps) => {
    const year = new Date().getFullYear();

    return (
        <footer className={className}>
            <small>
                © {year} Vaibhav Chauhan. All rights reserved.
            </small>
        </footer>
    );
};

export default Footer;