// Copyright 2019 Zaiste & contributors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fg = require('fast-glob');

const build = () => {
  const handlers = fg.sync(['features/**/controller/*.js']);

  return handlers.map(path => {
    const pattern = /([\.\w]+)\/controller\/(\w+)/;
    const [_, resource, operation] = pattern.exec(path);

    return { resource, operation, path };
  });
};

const translate = (name, resource) =>
  ({
    browse: { method: 'get', route: `/${resource}` },
    fetch: { method: 'get', route: `/${resource}/:id` },
    create: { method: 'post', route: `/${resource}` },
    update: { method: 'put', route: `/${resource}/:id` },
    destroy: { method: 'delete', route: `/${resource}/:id` }
  }[name]);

module.exports = {
  build,
  translate
};
