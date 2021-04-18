import { ChangeEvent, Component, FormEvent } from "react";

import {
  Gallery,
  ImageContainer,
  Image as StyledImage,
} from "styled/Gallery.styled";
import { Form, Input, SubmitButton } from "styled/Form.styled";
import { getRandomPhotos, searchPhoto } from "./api";
import getRandomDigits from "./utils";
import Image from "./types";

type State = {
  search: string;
  images: Image[];
  sizes: number[][];
};

class App extends Component<{}, State> {
  state: State = {
    search: "",
    images: [],
    sizes: getRandomDigits(),
  };

  componentDidMount() {
    getRandomPhotos().then((result) => this.setState({ images: result }));
  }

  handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { search } = this.state;

    if (this.state.search) {
      searchPhoto(search).then((result) => {
        this.setState({ images: result });
      });
    }
  };

  render() {
    const { images, search, sizes } = this.state;

    return (
      <section>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="search"
            name="search"
            value={search}
            onChange={this.handleChangeSearch}
          />
          <SubmitButton type="submit">Search</SubmitButton>
        </Form>
        <Gallery>
          {images.map((image, index) => {
            const [w, h] = sizes[index];

            return (
              <ImageContainer key={image.id} w={w} h={h}>
                <StyledImage
                  loading="lazy"
                  src={image.urls.regular}
                  alt={image.alt_description}
                />
              </ImageContainer>
            );
          })}
        </Gallery>
      </section>
    );
  }
}

export default App;
