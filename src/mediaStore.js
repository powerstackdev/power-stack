export default class DummyMediaStore {
  accept = '*';
  async persist() {
    alert('Cannot upload new files without a backend');
  }
  async previewSrc(src) {
    return src;
  }
  async list() {
    const items = [
      {
        id: 'img-left',
        type: 'file',
        filename: 'ivan-bandura-unsplash-square.jpg',
        directory: '/public',
        previewSrc: '/ivan-bandura-unsplash-square.jpg',
      },
      {
        id: 'img-right',
        type: 'file',
        filename: 'martin-sanchez-unsplash-square.jpg',
        directory: '/public',
        previewSrc: '/martin-sanchez-unsplash-square.jpg',
      },
    ];
    return {
      items,
      offset: 0,
      limit: 10,
      totalCount: 0,
    };
  }
  async delete() {
    alert('Cannot delete files without a backend');
  }
}
