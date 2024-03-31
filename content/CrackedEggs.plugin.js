/**
 * Cracked Eggs plugin - by Anthony Fuller
 *
 *
 * @licence LGPL-v3
 */

const { PEACOCKVER, PEACOCKVERSTRING } = require("@peacockproject/core/utils")
const { log, LogLevel } = require("@peacockproject/core/loggingInterop")

const challenges = [
	{
		Id: "6e958500-0a2e-4759-8a05-6dcd24dd7a4d",
		Name: "UI_CHALLENGE_GRASSSNAKE_EGGHUNT_LETHAL_NAME",
		ImageName: "images/contracts/escalation/ContractEscalation_Edgy_Grassnake_Egghunt_Lethal.jpg",
		Description: "UI_CHALLENGE_GRASSSNAKE_EGGHUNT_LETHAL_DESC",
		Rewards: {
			MasteryXP: 4000
		},
		Drops: ["PROP_MELEE_RED_EASTEREGG_LETHALGAS"],
		IsPlayable: true,
		IsLocked: false,
		HideProgression: false,
		CategoryName: "UI_MENU_PAGE_PROFILE_CHALLENGES_CATEGORY_COMMUNITY",
		Icon: "challenge_category_feats",
		LocationId: "LOCATION_PARENT_EDGY",
		ParentLocationId: "LOCATION_PARENT_EDGY",
		Type: "contract",
		DifficultyLevels: [],
		OrderIndex: 10000,
		XpModifier: {},
		RuntimeType: "Hit",
		Definition: {
			Scope: "hit",
			States: {
				Start: {
					ItemThrown: {
						Condition: {
							$eq: ["$Value.RepositoryId", "271eb4ce-7297-449d-95d4-20cd56dffd80"]
						},
						Transition: "CheckKill"
					}
				},
				CheckKill: {
					$timer: {
						Condition: {
							$after: 15
						},
						Transition: "Start"
					},
					Kill: {
						Condition: {
							$and: [
								{
									$eq: ["$Value.IsTarget", true]
								},
								{
									$any: {
										"?": {
											$eq: ["$.#", "Poison"]
										},
										in: "$Value.DamageEvents"
									}
								}
							]
						},
						Transition: "Success"
					}
				}
			}
		},
		Tags: ["hard", "feats"],
		InclusionData: {
			ContractIds: ["9d88605f-6871-46a8-bd46-9804ea04fca9"]
		}
	},
	{
		Id: "0c9c01f9-a5eb-459b-b3b5-be2c26cc0ed0",
		Name: "UI_CHALLENGE_GRASSSNAKE_EGGHUNT_EMETIC_NAME",
		ImageName: "images/contracts/escalation/ContractEscalation_Edgy_Grassnake_Egghunt_Emetic.jpg",
		Description: "UI_CHALLENGE_GRASSSNAKE_EGGHUNT_EMETIC_DESC",
		Rewards: {
			MasteryXP: 4000
		},
		Drops: ["PROP_MELEE_GREEN_EASTEREGG_EMETICGAS"],
		IsPlayable: true,
		IsLocked: false,
		HideProgression: false,
		CategoryName: "UI_MENU_PAGE_PROFILE_CHALLENGES_CATEGORY_COMMUNITY",
		Icon: "challenge_category_feats",
		LocationId: "LOCATION_PARENT_EDGY",
		ParentLocationId: "LOCATION_PARENT_EDGY",
		Type: "contract",
		DifficultyLevels: [],
		OrderIndex: 10000,
		XpModifier: {},
		RuntimeType: "Hit",
		Definition: {
			Scope: "hit",
			States: {
				Start: {
					ItemThrown: {
						Condition: {
							$eq: ["$Value.RepositoryId", "3a05dae6-d904-4a18-8196-de2d46e4c5d4"]
						},
						Transition: "CheckKill"
					}
				},
				CheckKill: {
					$timer: {
						Condition: {
							$after: 15
						},
						Transition: "Start"
					},
					Actorsick: {
						Condition: {
							$eq: ["$Value.IsTarget", true]
						},
						Transition: "Success"
					}
				}
			}
		},
		Tags: ["hard", "feats"],
		InclusionData: {
			ContractIds: ["9d88605f-6871-46a8-bd46-9804ea04fca9"]
		}
	},
	{
		Id: "8dc0adf9-ed62-4b87-a87f-bbc008f74d7a",
		Name: "UI_CHALLENGE_GRASSSNAKE_EGGHUNT_YELLOW_NAME",
		ImageName: "images/contracts/escalation/ContractEscalation_Edgy_Grassnake_Egghunt_Yellow.jpg",
		Description: "UI_CHALLENGE_GRASSSNAKE_EGGHUNT_YELLOW_DESC",
		Rewards: {
			MasteryXP: 4000
		},
		Drops: ["PROP_MELEE_YELLOW_EASTEREGG"],
		IsPlayable: true,
		IsLocked: false,
		HideProgression: false,
		CategoryName: "UI_MENU_PAGE_PROFILE_CHALLENGES_CATEGORY_COMMUNITY",
		Icon: "challenge_category_feats",
		LocationId: "LOCATION_PARENT_EDGY",
		ParentLocationId: "LOCATION_PARENT_EDGY",
		Type: "contract",
		DifficultyLevels: [],
		OrderIndex: 10000,
		XpModifier: {},
		RuntimeType: "Hit",
		Definition: {
			Scope: "hit",
			States: {
				Start: {
					ItemThrown: {
						Condition: {
							$eq: ["$Value.RepositoryId", "4ec12492-e385-424d-9f23-6f605501242d"]
						},
						Transition: "CheckKill"
					}
				},
				CheckKill: {
					$timer: {
						Condition: {
							$after: 5
						},
						Transition: "Start"
					},
					setpieces: {
						Condition: {
							$eq: ["$Value.Item_triggered_metricvalue", "EggHit"]
						},
						Transition: "Success"
					}
				}
			}
		},
		Tags: ["hard", "feats"],
		InclusionData: {
			ContractIds: ["9d88605f-6871-46a8-bd46-9804ea04fca9"]
		}
	}
]

module.exports = function CrackedEggs(controller) {
	if (Math.abs(PEACOCKVER) < 6600) {
		log(LogLevel.ERROR, `[Cracked Eggs] This plugin requires Peacock v6.6.0! You're on v${PEACOCKVERSTRING}!`)
		return
	}

	for (const challenge of challenges) {
		controller.challengeService.registerChallenge(challenge, "feats", challenge.ParentLocationId, "h3")
	}

	log(LogLevel.INFO, "[Cracked Eggs] Happy Easter! (Plugin Started)")
}
