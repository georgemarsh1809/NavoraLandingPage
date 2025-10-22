import './App.css';

function App() {
    const year = new Date().getFullYear();

    return (
        <div className="coming-soon">
            <main className="coming-soon__card" role="main">
                <span className="coming-soon__badge">GBM Group</span>
                <h1 className="coming-soon__title">Website coming soon</h1>
                <p className="coming-soon__subtitle">
                    We are building a fresh experience for our clients. Check back soon or get in touch if you need anything in the meantime.
                </p>
                <div className="coming-soon__actions">
                    <a className="coming-soon__link" href="mailto:hello@gbmgroup.com">
                        Contact us
                    </a>
                </div>
            </main>
            <footer className="coming-soon__footer">© {year} GBM Group. All rights reserved.</footer>
        </div>
    );
}

export default App;
