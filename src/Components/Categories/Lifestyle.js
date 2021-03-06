import React, { Component } from 'react'
import { getArticles } from '../../Modules/ArticlesData'
import { Image, Card, Grid, Divider, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Lifestyle extends Component {
  state = {
    articles: [],
    categoryName: 'Lifestyle'
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  componentDidMount() {
    this.getArticlesData()
  }

  async getArticlesData() {
    let fetch = await getArticles();
    if (fetch.error) {
      this.setErrorMessage(fetch.error)
    } else {
      this.setState({
        articles: fetch
      })
    }
  }

  articleIngress = (content, wordCount) => {
    let ingress = content.split(' ').slice(0, wordCount).join(' ')
    return ingress + '...'
  }

  render() {
    let { articles, categoryName } = this.state
    let filteredArticleList = []
    let errorMessage
    let lifestyleArticles

    articles.forEach(article => {
      if (article.category.name === categoryName) {
        return filteredArticleList.push(article)
      }
    })

    lifestyleArticles = (
      filteredArticleList.map(article => {
        return (
          <Grid.Column>
            <NavLink id={`article_${article.id}`} key={article.id} to={`/article/${article.id}`} >
              <Card>
                <Image src={article.image} alt="" wrapped ui={false} />
                <Card.Content>
                  <h3>{article.title}</h3>
                  <Divider />
                  <p>{this.articleIngress(article.content, 20)}</p>
                </Card.Content>
              </Card>
            </NavLink>
          </Grid.Column>
        )
      }
    ))

    return (
      <>
        <Header as='h2' id="lifestyle-header">Lifestyle</Header>
        <Grid centered container columns={3}>
          <Grid.Row>
            {lifestyleArticles}
          </Grid.Row>
        </Grid>
        {errorMessage}
      </>
    )
  }
}

export default Lifestyle