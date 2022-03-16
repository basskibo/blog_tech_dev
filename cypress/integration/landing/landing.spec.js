/// <reference types="cypress" />

describe("example to-do app", () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit("http://localhost:3000")
	})
	it("displays navigation ", () => {
		// We use the `cy.get()` command to get all elements that match the selector.
		// Then, we use `should` to assert that there are two matched items,
		// which are the two default items.
		cy.get("nav").should("have.length", 1)

		// We can go even further and check that the default todos each contain
		// the correct text. We use the `first` and `last` functions
		// to get just the first and last matched elements individually,
		// and then perform an assertion with `should`.
		// cy.get(".todo-list li").last().should("have.text", "Walk the dog")
	})
	it("displays welcoming message", () => {
		cy.get("h1 .text-3xl").first().should("have.text", "My name is Bojan")
	})
	it("displays read blog button", () => {
		cy.get("a ")
			.should("have.class", "font-semibold mt-5 px-5")
			.and("have.attr", "href")
	})

	it("displays see my bio button", () => {
		cy.contains("a", "#").should("have.attr", "href", "/routes/blog")
	})

	it("there is no empty anchor tags", () => {
		// cy.contains("a", "/routes/blog")
		cy.contains("a", "#").should("not.have.attr", "href", "#undefined")
	})
	// it("cy.location() - get window.location", () => {
	// 	// https://on.cypress.io/location
	// 	cy.location().should((location) => {
	// 		expect(location.hash).to.be.empty
	// 		expect(location.href).to.eq("http://localhost:3000/")
	// 		expect(location.host).to.eq("example.cypress.io")
	// 		expect(location.hostname).to.eq("example.cypress.io")
	// 		expect(location.origin).to.eq("https://example.cypress.io")
	// 		expect(location.pathname).to.eq("/commands/location")
	// 		expect(location.port).to.eq("")
	// 		expect(location.protocol).to.eq("https:")
	// 		expect(location.search).to.be.empty
	// 	})
	// })
})
