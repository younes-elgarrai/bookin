import React from 'react';
import { Avatar, Layout, Comment, Row, Col, Image, Rate} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';
import BookHeader from '../components/BookHeader';

const { Content } = Layout;

function BookScreen() {
  return (
    <Content className="container" >
            <BookHeader/>

        {/* Bloc résumé du livre */}
        <div className="textBloc">
        <Row>
            <Col xs={24}>
                <h3 className='h3'>Résumé du livre : Le parfum des fleurs la nuit</h3>
                <p>Comme un écrivain qui pense que « toute audace véritable vient de l’intérieur », Leïla Slimani n’aime pas sortir de chez elle, et préfère la solitude à la distraction. Pourquoi alors accepter cette proposition d’une nuit blanche à la pointe de la Douane, à Venise, dans les collections d’art de la Fondation Pinault, qui ne lui parlent guère ?Autour de cette « impossibilité » d’un livre, avec un art subtil de digresser dans la nuit vénitienne, Leila Slimani nous parle d’elle, de l’enfermement, du mouvement, du voyage, de l... Voir la suite</p>
            </Col>
        </Row>
        </div>


        {/* Bloc métas du livre */}
        <div className="textBloc">
        <Row >
            <Col xs={24} >
            <h3 className='h3'>Plus d'informations</h3>
            <p>
            Date de parution : 20 janvier 2021<br />
            Éditeur : Stock<br />
            Nombre pages : 128 pages<br />
            ISBN-13 : 978-2234088306</p>
            </Col>
        </Row>
        </div>

            {/* Bloc librairies avec le même livre */}
        <div className="libraryBloc">
            <Row>
            <Col xs={24} style={{marginBottom:'5px'}}>
                <h3 className='h3'>Ils ont ajouté ce livre à leur bibliothèque </h3>
            </Col>
            </Row>
            <Row>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            </Row>
        </div>

        {/* Bloc Recommandations */}
        <div className="libraryBloc">
            <Row>
            <Col xs={24} style={{marginBottom:'5px'}}>
                <h3 className='h3'>Nos recommandations</h3>
            </Col>
            </Row>
            <Row>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            <Col xs={12} md={6} xl={4} >
            <Image className="livre" width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            </Col>
            </Row>
        </div>

        {/* Bloc avis sur le livre */}
        <div className="libraryBloc">
            <Row>
            <Col xs={24} style={{marginBottom:'5px'}}>
                <h3 className='h3'>Les derniers avis</h3>
            </Col>
            </Row>
            <Row>
            <Col >
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                    }
                    content={
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully
                        and efficiently.
                    </p>
                    }
                />
            </Col>
            </Row>
 
        </div>
</Content>
);
}

export default BookScreen;


