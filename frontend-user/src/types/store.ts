import { initialState as IndexInitialState } from '@/pages/models';

type IndexModel = typeof IndexInitialState;

enum ModelNameSpaces {
  Index = 'Index',
}

type RootStore = {
  [key in ModelNameSpaces.Index]: IndexModel;
};

export { ModelNameSpaces, RootStore };
