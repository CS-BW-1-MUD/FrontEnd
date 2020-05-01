import React, { useState, useEffect } from "react";
// import { client } from "../utils/api";
import axios from "axios";
import { Card, Button } from "semantic-ui-react";
import "./map.scss";

const Map = () => {
	const [map, setmap] = useState([]);
	const [currentRoom, setcurrentRoom] = useState([]);

	useEffect(() => {
		async function fetchMapLayout() {
			const getMap = await axios.get("https://mud-game2.herokuapp.com/api/adv/rooms");
			setmap({ getMap });
		}
		fetchMapLayout();
	}, []);

	async function goNorth() {
		const nextRoom = await axios.post(
			"https://mud-game2.herokuapp.com/api/adv/move",
			{
				direction: "n",
			}
		);
		setcurrentRoom(nextRoom);
	}
	async function goSouth() {
		const nextRoom = await axios.post(
			"https://mud-game2.herokuapp.com/api/adv/move",
			{
				direction: "s",
			}
		);
		setcurrentRoom(nextRoom);
	}
	async function goEast() {
		const nextRoom = await axios.post(
			"https://mud-game2.herokuapp.com/api/adv/move",
			{
				direction: "e",
			}
		);
		setcurrentRoom(nextRoom);
	}
	async function goWest() {
		const nextRoom = await axios.post(
			"https://mud-game2.herokuapp.com/api/adv/move",
			{
				direction: "w",
			}
		);
		setcurrentRoom(nextRoom);
	}
	async function init() {
		const start = await axios.get("https://mud-game2.herokuapp.com/api/adv/init");
		setcurrentRoom(start);
	}

	return (
		<>
			<div className="menu">
				<Button onClick={init} className="mbtn" color="inverted green">
					Start
				</Button>
				<Button className="mbtn" color="inverted red">
					Quit
				</Button>
			</div>
			<div className="game">
				<div className="map">
					<div className="content">
						<Card.Group>
							{map.getMap &&
								map.getMap.data.map.map(data => (
									<div
										key={data.id}
										style={{
											display: "flex",
											flexWrap: "wrap",
											height: "100px",
											width: "100px",
											margin: "30px 30px",
										}}
									>
										<Card>
											<Card.Header>
												{data.title}
											</Card.Header>
											<Card.Description>
												{data.description}
											</Card.Description>
										</Card>
									</div>
								))}
						</Card.Group>
					</div>
				</div>

				<div className="current">
					{currentRoom.data &&
						currentRoom.data.map(data => (
							<div key={data.id}>
								You made it {data.name}, welcome to {data.title}
								. Where {data.description}. Lets Keep Going
								Where to next?
							</div>
						))}
				</div>
			</div>
			<div className="buttons">
				<Button className="btn" onClick={goNorth} color="inverted blue">
					North
				</Button>
				<Button className="btn" onClick={goEast} color="inverted blue">
					East
				</Button>
				<Button className="btn" onClick={goWest} color="inverted blue">
					West
				</Button>
				<Button className="btn" onClick={goSouth} color="inverted blue">
					South
				</Button>
			</div>
		</>
	);
};

export default Map;