export default function generateResultsHeaderData(selectedCriterion, searchQuery) {
    let displayedCriterion = ""
    let displayedSubtitle = ""

    // If redirected from searchBar => displaying results from search
    if (searchQuery) {
        displayedCriterion = `Found Results for "${searchQuery}"`
        displayedSubtitle = "sorted by relevance"
    }

    // If not => displaying listing by criterion
    else {
        displayedCriterion = selectedCriterion.charAt(0).toUpperCase() + selectedCriterion.slice(1)

        if (selectedCriterion === "best") {
            displayedSubtitle = `Since app is userless API request to /best would return the same results as /hot. \n
        Hence here app is getting the top results of all times instead.`
        }
        else if (selectedCriterion === "top") {
            displayedSubtitle = `Today's Top Posts`
        }
        else if (selectedCriterion === "hot") {
            displayedSubtitle = `New and Popular posts`
        }
        else if (selectedCriterion === "controversial") {
            displayedSubtitle = `This Week's Most Controverial Posts`
        }
    }

    return { displayedCriterion, displayedSubtitle }
}