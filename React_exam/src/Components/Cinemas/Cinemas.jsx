import { useState } from "react";
import "./Cinemas.css";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

const cinemaData = [
    {
        name: "Rajhans Cinemas: Rajhans Precia, Surat",
        address: "1st Floor, Rajhans Precia, Beside Rajhans Skylar, Udhana-Magdalla Road, Rundh-Vesu, Near VR Mall, Surat"
    },
    {
        name: "PVR: Rahul Raj, Surat",
        address: "3rd Floor, RahulRaj Mall, Dumas Road, Surat, Gujarat 395007, India"
    },
    {
        name: "Raj Imperial, INOX: Varachha Road, Surat",
        address: "RAJ Imperial, 3rd Floor, Deepkamal Mall And Multiplex, Varachha Road, Sarthana Jakat Naka, Surat"
    },
    {
        name: "Cinezza Multiplex: Maharaja Farm, Mota Varachha",
        address: "Golden City Road, Mota Varachha, Near DMART, Varachha, Gujarat 394101, India"
    },
    {
        name: "INOX: VR Mall, Surat",
        address: "3rd Floor, VR Mall, Dumas Road, Magdalla, Near Sunglass Hut, Surat, Gujarat 395007, India"
    },
    {
        name: "Rajhans Multiplex: Mota Varachha A.R Mall, Surat",
        address: "Block 78, AR Mall, Mota Varacha, Varachha, Gujarat 394101, India"
    },
    {
        name: "Cinepolis: Imperial Square Mall, Surat",
        address: "3rd Floor Imperial Square Mall, Upper Star Bazaar, Pal Hazira Road, Adajan, Surat, Gujarat 395009"
    },
    {
        name: "ROONGTA CINEMAS: Shyam Mandir Vesu, Surat",
        address: "5th Floor, Roongta Cinemas, Roongta Signature, Vesu, Opposite Shyam Baba Mandir, Surat, Gujarat"
    },
    {
        name: "Valentine Multiplex (Dolby Atmos): Surat",
        address: "Surat-Dumas Road, Piplod, Opposite Iris Mall, Surat, Gujarat 395007, India"
    },
    {
        name: "Apple Cinema: Jahangirpura, Surat",
        address: "6th Floor, Exxonilic Mall, Jahangirpura Variyaav Road, Near Iskon Temple, Jahangirpura, Surat"
    },
    {
        name: "Rajhans Cinemas: Rajhans Flamingo, Katargam, Surat",
        address: "Rajhans Flamingo Mall, Ambatalavadi, Katargam, Surat, Gujarat 395004, India"
    },
    {
        name: "Rajhans Multiplex: Adajan, Surat",
        address: "Pal-Hazira Road, Adajan, Near ICICI Bank, Surat, Gujarat 395009, India"
    },
    {
        name: "Loop Cinemas Homeland City: Vesu",
        address: "Second floor, Homeland City, Sai Kutir Society, Piplod, Surat, Gujarat 395007, India"
    },
    {
        name: "INOX: Reliance Mall, Surat",
        address: "4th Floor, Reliance Mega Mall, Udhna, Nearby Reliance Smart, Surat, Gujarat 395002, India"
    },
    {
        name: "Cinezza Multiplex: Jahangirpura, Surat",
        address: "Prabhudarshan Society, Jahangirabad, Sima Nagar, Near DMart, Surat, Gujarat 395005, India"
    },
    {
        name: "Rajhans Cinemas: Aagam Viviana Mall Vesu, Surat",
        address: "1st Floor, Aagam Viviana Mall, Vesu, Opposite Phoenix Tower, Surat, Gujarat 394518, India"
    },
    {
        name: "Gandhi Cinema: Surat",
        address: "4001/4002 4th Floor, Central Bazar Veneziano, University Road, Beside Kausal Brown, Surat"
    },
    {
        name: "Time Cinema: Galaxy Circle Pal, Surat",
        address: "Fortune The Shopping Island, Near Galaxy Circle, New Rto-Pal Lake Road, Pal, Surat, Gujarat 394510"
    }
];

const Cinemas = () => {
    const [search, setSearch] = useState("");

    const filteredCinemas = cinemaData.filter((cinema) =>
        cinema.name.toLowerCase().includes(search.toLowerCase()) ||
        cinema.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container className="py-4">
            <div className="cinemas d-flex align-items-center justify-content-between mb-4">
                <h2 className="mb-3">Cinema In Surat</h2>
                <Form.Control
                    type="text"
                    placeholder="Search by cinema or area"
                    className="mb-4 w-50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Row xs={1} sm={2} md={3} lg={3}>
                {filteredCinemas.map((cinema, index) => (
                    <Col key={index} className="mb-4">
                        <Card className="cinema-card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-start justify-content-between">
                                    <h5 className="card-title">{cinema.name}</h5>
                                    <span style={{ fontSize: "18px", color: "#dc3545" }}>♡</span>
                                </div>
                                <Card.Text className="text-muted">{cinema.address}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Cinemas;
